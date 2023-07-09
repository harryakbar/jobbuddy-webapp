"use client";

import { Fragment, useEffect, useState } from "react";
import Input from "../Input";
import FormConfig from "../formConfig";
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";
import { MODES } from "../form";
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

function Achievement(props) {
  const { user } = props;
  const [loading, setLoading] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [response, setResponse] = useState(null);
  const [mode, setMode] = useState(MODES.view);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      setAchievements(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const handleClick = async (id) => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const description = achievements.find((item) => item.id === id).description;

    try {
      setResponse("");
      setLoading("achievement");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
          You are a resume maker, please improve the following achievement description to make it more sophisticated
          ${description}
          `,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setResponse(response.data?.choices[0]?.text.trim());
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(null);
  };

  const handleAdd = () => {
    setAchievements((prevState) => {
      const lastNumId = prevState
        .filter((item) => typeof item.id === "number")
        .map((item) => item.id);

      let newIndex = 0;
      if (lastNumId.length > 0) {
        newIndex = lastNumId[lastNumId.length - 1] + 1;
      }

      return [
        ...prevState,
        {
          id: newIndex,
          user_id: user.id,
          title: "",
          description: "",
        },
      ];
    });
  };

  const handleChange = (fieldName, id, newValue) => {
    const index = achievements.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedAchievements = [...achievements];
      updatedAchievements[index] = {
        ...updatedAchievements[index],
        [fieldName]: newValue,
      };
      setAchievements(updatedAchievements);
    }
  };

  const handleSaveData = async () => {
    // Insert
    const parsedData = achievements
      .filter(({ id }) => typeof id === "number")
      .map((achievement) => ({
        user_id: user.id,
        title: achievement.title,
        description: achievement.description,
      }));
    if (parsedData.length > 0) {
      let { error } = await supabase.from("achievements").insert(parsedData);
      if (error) {
        console.error("Error saving achievements:", error);
      }
    }

    // Delete
    if (deleted.length > 0) {
      console.log(deleted);
      const { data, error: errDelete } = await supabase
        .from("achievements")
        .delete()
        .in("id", deleted);

      console.log({ data });
      if (errDelete) {
        console.error(errDelete);
      }
    }

    fetchData();
    setMode(MODES.view);
  };

  const handleDelete = (id) => {
    setDeleted((prevState) => [...prevState, id]);
  };

  const handleEditProfile = () => {
    setMode(MODES.edit);
  };

  const handleCancelAction = () => {
    setDeleted([]);
    fetchData();
    setMode(MODES.view);
  };

  return (
    <>
      <div className="flex flex-row items-center w-[100%] place-content-between mb-8">
        <span className="font-bold">Achievement</span>
        {mode === MODES.edit ? (
          <div className="space-x-4">
            <button
              onClick={handleCancelAction}
              className="rounded-md text-[#F36868] p-2 border-2 border-[#F36868] cursor-pointer font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveData}
              className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer space-x-2"
            >
              <span>💾</span>
              <span>Save Achievement</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditProfile}
            className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
          >
            ✏️ Edit
          </button>
        )}
      </div>
      {achievements &&
        Array.isArray(achievements) &&
        achievements
          .filter(({ id }) => !deleted.includes(id))
          .map((achievement) => (
            <Fragment key={achievement.id}>
              <div className="flex row relative">
                <Input
                  mode={mode}
                  label={FormConfig.achievement.title.label}
                  type={FormConfig.achievement.title.type}
                  value={achievement.title}
                  onChange={(event) => {
                    handleChange("title", achievement.id, event.target.value);
                  }}
                />
                {mode === MODES.edit && (
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="btn btn-square absolute right-0 top-0"
                  >
                    <Image src={"/icon-trash.svg"} width={20} height={20} />
                  </button>
                )}
              </div>
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
                <Input
                  mode={mode}
                  label={FormConfig.achievement.description.label}
                  type={FormConfig.achievement.description.type}
                  value={achievement.description}
                  onChange={(event) => {
                    handleChange(
                      "description",
                      achievement.id,
                      event.target.value
                    );
                  }}
                />
                {loading === "achievement" ? (
                  <div className="flex flex-col w-1/2">
                    <span className="relative flex">
                      <span
                        className="animate-spin ease-in-out h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        🪄
                      </span>
                      Doing magic...
                    </span>
                    <div className="border border-blue-300 shadow rounded-md w-full h-full">
                      <div className="animate-pulse p-2">
                        <div className="flex-1 space-y-2">
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                          <div className="h-2 bg-slate-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                {response ? (
                  <Input
                    mode={mode}
                    label={FormConfig.achievement.description.label}
                    type={FormConfig.achievement.description.type}
                    value={response}
                    disabled
                  />
                ) : null}
              </div>
              {mode === MODES.edit && (
                <div className="mb-8">
                  <button
                    onClick={() => handleClick(achievement.id)}
                    className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
                  >
                    Improve with Magic ✨
                  </button>
                </div>
              )}
              <div className="border mb-8" />
            </Fragment>
          ))}

      {mode === MODES.edit && (
        <div>
          <button
            onClick={handleAdd}
            className="rounded-md text-white px-4 py-2 bg-[#8EB8E2] cursor-pointer"
          >
            + Add Achievement
          </button>
        </div>
      )}
    </>
  );
}

export default Achievement;
