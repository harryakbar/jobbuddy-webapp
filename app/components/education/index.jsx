"use client";

import { Fragment, useEffect, useState } from "react";
import Input from "../Input";
import FormConfig from "../formConfig";
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";
import { MODES } from "../form";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

function Education(props) {
  const { user } = props;
  const [loading, setLoading] = useState(null);
  const [educations, setEducations] = useState([]);
  const [response, setResponse] = useState(null);
  const [mode, setMode] = useState(MODES.view);

  useEffect(() => {
    // Fetch data from a table
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("educations")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        setEducations(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const handleClick = async (id) => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const description = educations.find((item) => item.id === id).description;

    try {
      setResponse("");
      setLoading("education");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
          You are a resume maker, please improve the following education description to make it more sophisticated
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
    setEducations((prevState) => {
      return [
        ...prevState,
        {
          institution: "",
          degree: "",
          field_of_study: "",
          end_date: "",
          start_date: "",
          description: "",
          grade: "",
        },
      ];
    });
  };

  const handleEditProfile = () => {
    setMode(MODES.edit);
  };

  const handleSaveData = async () => {
    // const { data, error } = await supabase.from("educations").insert([
    //   {
    //     user_id: user.id,
    //     institution: "Universitas Indonesia",
    //     degree: "Undergraduate",
    //     field_of_study: "Computer Science",
    //     end_date: "2023-04-17",
    //     start_date: "2027-04-17",
    //     description: "Studying Computer Science",
    //     grade: "A",
    //   },
    // ]);

    // if (error) {
    //   console.error("Error saving experience:", error);
    // } else {
    //   console.log("Experience saved successfully:", data);
    // }
    setMode(MODES.view);
  };

  const handleChange = (fieldName, id, newValue) => {
    const index = educations.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedEducations = [...educations];
      updatedEducations[index] = {
        ...updatedEducations[index],
        [fieldName]: newValue,
      };
      setEducations(updatedEducations);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center w-[100%] place-content-between mb-8">
        <span className="font-bold">Education</span>
        {mode === MODES.edit ? (
          <button
            onClick={handleSaveData}
            className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
          >
            💾 Save Education
          </button>
        ) : (
          <button
            onClick={handleEditProfile}
            className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
          >
            ✏️ Edit
          </button>
        )}
      </div>
      {educations &&
        Array.isArray(educations) &&
        educations.map((education) => (
          <Fragment key={education.id}>
            <Input
              mode={mode}
              label={FormConfig.education.title.label}
              type={FormConfig.education.title.type}
              value={education.institution}
              onChange={(event) =>
                handleChange("institution", education.id, event.target.value)
              }
            />
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
              <Input
                mode={mode}
                label={FormConfig.education.degree.label}
                type={FormConfig.education.degree.type}
                value={education.degree}
                onChange={(event) =>
                  handleChange("degree", education.id, event.target.value)
                }
              />
              <Input
                mode={mode}
                label={FormConfig.education.field_of_study.label}
                type={FormConfig.education.field_of_study.type}
                value={education.field_of_study}
                onChange={(event) =>
                  handleChange(
                    "field_of_study",
                    education.id,
                    event.target.value
                  )
                }
              />
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
              <Input
                mode={mode}
                label={FormConfig.start_date.label}
                type={FormConfig.start_date.type}
                value={education.start_date}
                onChange={(event) =>
                  handleChange("start_date", education.id, event.target.value)
                }
              />
              <Input
                mode={mode}
                label={FormConfig.end_date.label}
                type={FormConfig.end_date.type}
                value={education.end_date}
                onChange={(event) =>
                  handleChange("end_date", education.id, event.target.value)
                }
              />
            </div>
            <Input
              mode={mode}
              label={FormConfig.education.grade.label}
              type={FormConfig.education.grade.type}
              value={education.grade}
              onChange={(event) =>
                handleChange("grade", education.id, event.target.value)
              }
            />
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
              <Input
                mode={mode}
                label={FormConfig.education.education_desc.label}
                type={FormConfig.education.education_desc.type}
                value={education.description}
                onChange={(event) =>
                  handleChange("description", education.id, event.target.value)
                }
              />
              {loading === "education" ? (
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
                  isMagic
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
                  onClick={() => handleClick(education.id)}
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
            + Add Education
          </button>
        </div>
      )}
    </>
  );
}

export default Education;
