"use client";
import { useState } from "react";
import EventHandler from "./EventHandler";
import { Configuration, OpenAIApi } from "openai";

const Input = (props) => {
  const { label, type, onChange, value, disabled, isMagic } = props;
  const isTextArea = type === "textarea";

  if (isTextArea) {
    return (
      <div className="flex flex-col w-full md:w-1/2">
        <span>{label}</span>
        <textarea
          onChange={onChange}
          type={type}
          className="border border-slate-300 rounded-md p-2"
          value={value}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-1/2">
      <span>{label}</span>
      <input
        onChange={onChange}
        type={type}
        className="border border-slate-300 rounded-md p-2"
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

const FormConfig = {
  // Job
  company: {
    label: "Company Name",
    type: "text",
  },
  role: {
    label: "Role",
    type: "text",
  },
  job_description: {
    label: "Description",
    type: "textarea",
  },
  cover_letter_result: {
    label: "Your Cover Letter",
    type: "textarea",
  },
};

const DashboardForm = () => {
  const [response, setResponse] = useState(null);
  const [achievementResponse, setAchievementResponse] = useState("");
  const [educationResponse, setEducationResponse] = useState("");
  const [loading, setLoading] = useState(null);

  const [description, setDescription] = useState("");
  const [achievementDesc, setAchievementDesc] = useState("");
  const [educationDesc, setEducationDesc] = useState("");

  const handleClick = async () => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      setResponse("");
      setLoading("cover_letter");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
        You are a cover letter generator who masters all languages, please generate cover letter based on the following experiences and make it sophisticated. Please generate the cover letter based on the following text's main language
        ${description}
        `,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setResponse(response.data.choices[0].text); // Store the response in state or perform any other action
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(null);
  };

  return (
    <form onSubmit={EventHandler} className="w-full md:p-12">
      <div className="bg-white drop-shadow-md rounded-md p-4 w-full">
        <h3 className="font-bold">Generate Your Personalized Cover Letter</h3>
        <div className="flex row items-center">
          <span>Fill the job description</span>
        </div>
        <div className="flex flex-col space-y-4">
          {/* Job Description */}
          <div className="border" />
          <span>Experience</span>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              label={FormConfig.company.label}
              type={FormConfig.company.type}
            />
            <Input label={FormConfig.role.label} type={FormConfig.role.type} />
          </div>
          <Input
            label={FormConfig.job_description.label}
            type={FormConfig.job_description.type}
            onChange={(event) => {
              event.preventDefault();
              setDescription(event.target.value);
            }}
          />
          <div>
            <button
              onClick={handleClick}
              className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
            >
              Generate with Magic ✨
            </button>
          </div>

          {/* Result */}
          <div className="border mt-4" />
          {loading === "cover_letter" ? (
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
          {response && (
            <div>
              <Input
                isMagic
                label="Here's our suggestion:"
                type={FormConfig.cover_letter_result.type}
                value={response}
                onChange={(event) => {
                  event.preventDefault();
                  setDescription(event.target.value);
                }}
              />
              <button className="rounded-md text-white px-4 py-2 bg-[#8EB8E2] mt-4 cursor-pointer">
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default DashboardForm;
