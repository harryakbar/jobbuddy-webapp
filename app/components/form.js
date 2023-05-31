"use client";
import { useState } from "react";
import EventHandler from "./EventHandler";
import { Configuration, OpenAIApi } from "openai";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

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
  name: {
    label: "Name",
    type: "text",
  },
  email: {
    label: "Email",
    type: "email",
  },
  phone: {
    label: "Phone Number",
    type: "phone",
  },

  // Experience
  company: {
    label: "Company Name",
    type: "text",
  },
  role: {
    label: "Role",
    type: "text",
  },
  start_date: {
    label: "Start Date",
    type: "date",
  },
  end_date: {
    label: "End Date (or expected)",
    type: "date",
  },
  experience_description: {
    label: "Description",
    type: "textarea",
  },

  // Education
  education: {
    title: {
      label: "University",
      type: "text",
    },
    degree: {
      label: "Degree",
      type: "text",
    },
    field_of_study: {
      label: "Field of Study",
      type: "text",
    },
    start_date_education: {
      label: "Start Date",
      type: "date",
    },
    end_date_education: {
      label: "End Date",
      type: "date",
    },
    grade: {
      label: "Grade",
      type: "text",
    },
    education_desc: {
      label: "Description",
      type: "textarea",
    },
  },

  // Achievements
  achievement: {
    title: {
      label: "Title",
      type: "text",
    },
    description: {
      label: "Description",
      type: "textarea",
    },
  },
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabasePublicKey);

const Form = () => {
  const [response, setResponse] = useState(null);
  const [achievementResponse, setAchievementResponse] = useState("");
  const [educationResponse, setEducationResponse] = useState("");
  const [loading, setLoading] = useState(null);

  const [description, setDescription] = useState("");
  const [achievementDesc, setAchievementDesc] = useState("");
  const [educationDesc, setEducationDesc] = useState("");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Handle authentication state changes here, if needed
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleClick = async () => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

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

      setResponse(response.data.choices[0].text); // Store the response in state or perform any other action
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(null);
  };

  const handleEducationDescriptionClick = async () => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      setEducationResponse("");
      setLoading("education");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
        You are a resume maker, please improve the following education description to make it more sophisticated
        ${educationDesc}
        `,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setEducationResponse(response.data.choices[0].text); // Store the response in state or perform any other action
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(null);
  };

  const handleAchievementDescriptionClick = async () => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
      setAchievementResponse("");
      setLoading("achievement");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
        You are a resume maker, please improve the following achievement description to make it more sophisticated
        ${achievementDesc}
        `,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setAchievementResponse(response.data.choices[0].text); // Store the response in state or perform any other action
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(null);
  };

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    console.log(data);

    if (error) {
      console.error("Error signing in with Google:", error);
    } else {
      console.log("User signed in with Google:", user);
      console.log("Session:", session);
    }
  };

  return (
    <form onSubmit={EventHandler} className="w-full md:p-12">
      <div className="bg-white drop-shadow-md rounded-md p-4 w-full">
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <h3 className="font-bold">Create Your Job Profile</h3>
        <div className="flex row items-center my-4">
          <span>LinkedIn Profile</span>
          <button className="ml-2 rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer hover:bg-sky-900 hover:scale-105 transition ease-in-out delay-150">
            Fill Profile with LinkedIn
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <Input label={FormConfig.name.label} type={FormConfig.name.type} />
          <Input label={FormConfig.email.label} type={FormConfig.email.type} />
          <Input label={FormConfig.phone.label} type={FormConfig.phone.type} />
          {/* Experience */}
          <div className="border" />
          <span>Experience</span>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              label={FormConfig.company.label}
              type={FormConfig.company.type}
            />
            <Input label={FormConfig.role.label} type={FormConfig.role.type} />
          </div>

          <label>
            <input type="checkbox" on />
            <span className="ml-2">I am currently working in this role</span>
          </label>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              label={FormConfig.start_date.label}
              type={FormConfig.start_date.type}
            />
            <Input
              label={FormConfig.end_date.label}
              type={FormConfig.end_date.type}
            />
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              label={FormConfig.experience_description.label}
              type={FormConfig.experience_description.type}
              onChange={(event) => {
                event.preventDefault();
                setDescription(event.target.value);
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
                isMagic
                label="Here's our suggestion:"
                type={FormConfig.experience_description.type}
                value={response}
                onChange={(event) => {
                  event.preventDefault();
                  setDescription(event.target.value);
                }}
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

          <div>
            <button className="rounded-md text-white px-4 py-2 bg-[#8EB8E2] cursor-pointer">
              Add Experience
            </button>
          </div>

          {/* Education */}
          <div className="border" />
          <span>Education</span>
          <Input
            label={FormConfig.education.title.label}
            type={FormConfig.education.title.type}
          />
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              label={FormConfig.education.degree.label}
              type={FormConfig.education.degree.type}
            />
            <Input
              label={FormConfig.education.field_of_study.label}
              type={FormConfig.education.field_of_study.type}
            />
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              label={FormConfig.start_date.label}
              type={FormConfig.start_date.type}
            />
            <Input
              label={FormConfig.end_date.label}
              type={FormConfig.end_date.type}
            />
          </div>
          <Input
            label={FormConfig.education.grade.label}
            type={FormConfig.education.grade.type}
          />
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              label={FormConfig.education.education_desc.label}
              type={FormConfig.education.education_desc.type}
              onChange={(event) => {
                event.preventDefault();
                setEducationDesc(event.target.value);
              }}
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
            {educationResponse ? (
              <Input
                isMagic
                label="Here's our suggestion:"
                type={FormConfig.experience_description.type}
                value={educationResponse}
                onChange={(event) => {
                  event.preventDefault();
                  setDescription(event.target.value);
                }}
              />
            ) : null}
          </div>
          <div>
            <button
              onClick={handleEducationDescriptionClick}
              className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
            >
              Improve with Magic ✨
            </button>
          </div>

          <div>
            <button className="rounded-md text-white px-4 py-2 bg-[#8EB8E2] cursor-pointer">
              Add Education
            </button>
          </div>

          {/* Achievements */}
          <div className="border" />
          <span>Achievement</span>
          <Input
            label={FormConfig.achievement.title.label}
            type={FormConfig.achievement.title.type}
          />
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
            <Input
              label={FormConfig.achievement.description.label}
              type={FormConfig.achievement.description.type}
              onChange={(event) => {
                event.preventDefault();
                setAchievementDesc(event.target.value);
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
            {achievementResponse ? (
              <Input
                label={FormConfig.achievement.description.label}
                type={FormConfig.achievement.description.type}
                value={achievementResponse}
                onChange={(event) => {
                  event.preventDefault();
                  setAchievementDesc(event.target.value);
                }}
              />
            ) : null}
          </div>
          <div>
            <button
              onClick={handleAchievementDescriptionClick}
              className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
            >
              Improve with Magic ✨
            </button>
          </div>

          <div>
            <button className="rounded-md text-white px-4 py-2 bg-[#8EB8E2] cursor-pointer">
              Add Achievement
            </button>
          </div>
        </div>

        <div className="border mt-4" />
        <input
          type="submit"
          className="mt-4 rounded-md text-white px-4 sm:px-8 py-2 sm:py-3 bg-[#8EB8E2] cursor-pointer"
          value="Save Profile"
        />
      </div>
    </form>
  );
};

export default Form;
