"use client";
import { createClient } from "@supabase/supabase-js";
import { Fragment, useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Input from "../Input";
import FormConfig from "../formConfig";
import { MODES } from "../form";
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

function Experience(props) {
  const { user } = props;
  const [loading, setLoading] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [response, setResponse] = useState(null);
  const [mode, setMode] = useState(MODES.view);
  const [deleted, setDeleted] = useState([]);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      setExperiences(data);
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
    const description = experiences.find((item) => item.id === id).description;

    try {
      setResponse("");
      setLoading("experience");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
          You are a resume maker, please improve the following experience description to make it more sophisticated
          ${description}
          `,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setResponse(response.data?.choices[0]?.text.trim()); // Store the response in state or perform any other action
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(null);
  };

  const handleAdd = () => {
    setExperiences((prevState) => {
      return [
        ...prevState,
        {
          company_name: "",
          description: "",
          is_current: false,
          position: "",
          start_date: "",
        },
      ];
    });
  };

  const handleChange = (fieldName, id, newValue) => {
    const index = experiences.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [fieldName]: newValue,
      };
      setExperiences(updatedExperiences);
    }
  };

  const handleEditProfile = () => {
    setMode(MODES.edit);
  };

  const handleSaveData = async () => {
    // Insert
    const parsedData = experiences
      .filter(({ id }) => typeof id === "number")
      .map((experience) => ({
        user_id: user.id,
        position: experience.position,
        company_name: experience.company_name,
        start_date: experience.start_date,
        end_date: experience.end_date,
        is_current: experience.is_current,
        description: experience.description,
      }));
    if (parsedData.length > 0) {
      let { error } = await supabase.from("experiences").insert(parsedData);
      if (error) {
        console.error("Error saving experiences:", error);
      }
    }

    // Delete
    if (deleted.length > 0) {
      const { data, error: errDelete } = await supabase
        .from("experiences")
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

  const handleCancelAction = () => {
    setDeleted([]);
    fetchData();
    setMode(MODES.view);
  };

  return (
    <>
      <div className="flex flex-row items-center w-[100%] place-content-between mb-8">
        <span className="font-bold">Experience</span>
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
              <span>Save Experience</span>
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
      <div className="border-l-4 pl-6 pb-0 mb-0">
        {experiences &&
          Array.isArray(experiences) &&
          experiences
            .filter(({ id }) => !deleted.includes(id))
            .map((experience) => (
              <Fragment key={experience.id}>
                <div className="flex flex-col relative space-y-4 md:flex-row md:space-x-2 md:space-y-0 pt-2">
                  <Input
                    mode={mode}
                    label={FormConfig.company.label}
                    type={FormConfig.company.type}
                    value={experience.company_name}
                    onChange={(event) => {
                      handleChange(
                        "company_name",
                        experience.id,
                        event.target.value
                      );
                    }}
                  />
                  <Input
                    mode={mode}
                    label={FormConfig.role.label}
                    type={FormConfig.role.type}
                    value={experience.position}
                    onChange={(event) => {
                      handleChange(
                        "position",
                        experience.id,
                        event.target.value
                      );
                    }}
                  />
                  {mode === MODES.edit && (
                    <button
                      onClick={() => handleDelete(experience.id)}
                      className="btn btn-square absolute right-0 top-0"
                    >
                      <Image src={"/icon-trash.svg"} width={20} height={20} />
                    </button>
                  )}
                </div>

                <label className="flex mb-8">
                  <input
                    mode={mode}
                    type="checkbox"
                    checked={experience.is_current}
                    onChange={() => {
                      handleChange(
                        "is_current",
                        experience.id,
                        !experience.is_current
                      );
                    }}
                  />
                  <span className="ml-2">
                    I am currently working in this role
                  </span>
                </label>

                <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
                  <Input
                    mode={mode}
                    label={FormConfig.start_date.label}
                    type={FormConfig.start_date.type}
                    value={experience.start_date}
                    onChange={(event) => {
                      handleChange(
                        "start_date",
                        experience.id,
                        event.target.value
                      );
                    }}
                  />
                  <Input
                    mode={mode}
                    label={FormConfig.end_date.label}
                    type={FormConfig.end_date.type}
                    value={experience.end_date}
                    disabled={experience.is_current}
                    onChange={(event) => {
                      handleChange(
                        "end_date",
                        experience.id,
                        event.target.value
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
                  <Input
                    mode={mode}
                    label={FormConfig.experience_description.label}
                    type={FormConfig.experience_description.type}
                    value={experience.description}
                    onChange={(event) => {
                      handleChange(
                        "description",
                        experience.id,
                        event.target.value
                      );
                    }}
                  />
                  {loading === "experience" ? (
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
                      label="Here's our suggestion:"
                      type={FormConfig.experience_description.type}
                      value={response}
                      disabled
                    />
                  ) : null}
                </div>
                {mode === MODES.edit && (
                  <div className="mb-8">
                    <button
                      onClick={() => handleClick(experience.id)}
                      className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
                    >
                      Improve with Magic ✨
                    </button>
                  </div>
                )}
                <div className="border mb-8" />
              </Fragment>
            ))}
      </div>

      {mode === MODES.edit && (
        <div className="mt-6">
          <button
            onClick={handleAdd}
            className="rounded-md text-white px-4 py-2 bg-[#8EB8E2] cursor-pointer"
          >
            + Add Experience
          </button>
        </div>
      )}
    </>
  );
}
export default Experience;
