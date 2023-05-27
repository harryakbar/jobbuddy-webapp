"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "./global.css";
import EventHandler from "./components/EventHandler";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Container = (props) => {
  return (
    <div
      className={[
        "flex p-2 mb-4 row drop-shadow-md bg-[#FFFDF6] rounded-md w-full place-content-between",
        props.margin || "p-2",
      ]}
    >
      {props.children}
    </div>
  );
};

const Input = (props) => {
  const { label, type, onChange } = props;
  const isTextArea = type === "textarea";

  if (isTextArea) {
    return (
      <div className="flex flex-col w-full">
        <span>{label}</span>
        <textarea
          onChange={onChange}
          type={type}
          className="border border-slate-300 rounded-md"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <span>{label}</span>
      <input
        onChange={onChange}
        type={type}
        className="border border-slate-300 rounded-md"
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

export default function Home() {
  const [response, setResponse] = useState(null);
  const [description, setDescription] = useState("");

  const handleClick = async () => {
    const configuration = new Configuration({
      apiKey: "null",
    });
    const openai = new OpenAIApi(configuration);

    console.log(description);
    try {
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

      // Handle the API response
      console.log(response);
      setResponse(response.data.choices[0].text); // Store the response in state or perform any other action
    } catch (error) {
      console.error("Error:", error);
      // Handle the error
    }
  };

  return (
    <main className={styles.main}>
      <Container>
        <img
          className="w-6 h-6"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/768px-Google_Chrome_icon_%28February_2022%29.svg.png"
          alt="icon"
        />
        <div className="flex row">
          <span>Dashboard</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
            alt="profile"
            className="w-6 h-6"
          />
        </div>
      </Container>

      <Container>
        <form onSubmit={EventHandler} className="w-full p-12">
          <div className="bg-white drop-shadow-md rounded-md p-4 w-full">
            <h3 className="font-bold">Create Your Job Profile</h3>
            <div className="flex row items-center">
              <span>LinkedIn Profile</span>
              <button className="ml-2 text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">
                Fill Profile with LinkedIn
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <Input
                label={FormConfig.name.label}
                type={FormConfig.name.type}
              />
              <Input
                label={FormConfig.email.label}
                type={FormConfig.email.type}
              />
              <Input
                label={FormConfig.phone.label}
                type={FormConfig.phone.type}
              />
              {/* Experience */}
              <div className="border" />
              <span>Experience</span>
              <div className="flex row space-x-2">
                <Input
                  label={FormConfig.company.label}
                  type={FormConfig.company.type}
                />
                <Input
                  label={FormConfig.role.label}
                  type={FormConfig.role.type}
                />
              </div>

              <label>
                <input type="checkbox" />
                <span className="ml-2">
                  I am currently working in this role
                </span>
              </label>

              <div className="flex row space-x-2">
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
                label={FormConfig.experience_description.label}
                type={FormConfig.experience_description.type}
                onChange={(event) => {
                  event.preventDefault();
                  setDescription(event.target.value);
                }}
              />
              <div>{JSON.stringify(response)}</div>
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
              <div className="flex row space-x-2">
                <Input
                  label={FormConfig.education.degree.label}
                  type={FormConfig.education.degree.type}
                />
                <Input
                  label={FormConfig.education.field_of_study.label}
                  type={FormConfig.education.field_of_study.type}
                />
              </div>
              <div className="flex row space-x-2">
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
              <Input
                label={FormConfig.experience_description.label}
                type={FormConfig.experience_description.type}
              />
              <div>
                <button className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer">
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
              <Input
                label={FormConfig.achievement.description.label}
                type={FormConfig.achievement.description.type}
              />
              <div>
                <button className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer">
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
      </Container>
    </main>
  );
}
