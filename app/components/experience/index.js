"use client";
import { createClient } from "@supabase/supabase-js";
import { Fragment, useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Input from "../Input";
import FormConfig from "../formConfig";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

function Experience(props) {
  const { user } = props;
  const [loading, setLoading] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
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

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const handleClick = async () => {
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

  const handleSaveData = async () => {
    const { data, error } = await supabase.from("experiences").insert([
      {
        position: "Software Engineer",
        company_name: "Google",
        start_date: "2023-04-17",
        end_date: null,
        is_current: true,
        user_id: user.id,
        description: "",
      },
    ]);

    if (error) {
      console.error("Error saving experience:", error);
    } else {
      console.log("Experience saved successfully:", data);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center w-[100%] place-content-between">
        <span className="font-bold">Experience</span>
        <button
          onClick={handleSaveData}
          className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
        >
          💾 Save Experience
        </button>
      </div>
      {experiences &&
        Array.isArray(experiences) &&
        experiences.map((experience) => (
          <Fragment key={experience.id}>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
              <Input
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
                label={FormConfig.role.label}
                type={FormConfig.role.type}
                value={experience.position}
                onChange={(event) => {
                  handleChange("position", experience.id, event.target.value);
                }}
              />
            </div>

            <label>
              <input
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
              <span className="ml-2">I am currently working in this role</span>
            </label>

            <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
              <Input
                label={FormConfig.start_date.label}
                type={FormConfig.start_date.type}
                value={experience.start_date}
                onChange={(event) => {
                  handleChange("start_date", experience.id, event.target.value);
                }}
              />
              <Input
                label={FormConfig.end_date.label}
                type={FormConfig.end_date.type}
                value={experience.end_date}
                disabled={experience.is_current}
                onChange={(event) => {
                  handleChange("end_date", experience.id, event.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
              <Input
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
                  label="Here's our suggestion:"
                  type={FormConfig.experience_description.type}
                  value={response}
                  disabled
                />
              ) : null}
            </div>
            <div>
              <button
                onClick={handleClick}
                className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
              >
                Improve with Magic ✨
              </button>
            </div>
            <div className="border" />
          </Fragment>
        ))}

      <div>
        <button
          onClick={handleAdd}
          className="rounded-md text-white px-4 py-2 bg-[#8EB8E2] cursor-pointer"
        >
          + Add Experience
        </button>
      </div>
    </>
  );
}
export default Experience;
