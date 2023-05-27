"use client";
import Image from "next/image";
import styles from "../page.module.css";
import "../global.css";
import EventHandler from "../components/EventHandler";
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
  const { label, type, onChange, value } = props;
  const isTextArea = type === "textarea";

  if (isTextArea) {
    return (
      <div className="flex flex-col w-full">
        <span>{label}</span>
        <textarea
          onChange={onChange}
          type={type}
          value={JSON.stringify(value)}
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
  }
};

export default function Dashboard() {
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
            <h3 className="font-bold">Generate Your Personalized Cover Letter</h3>
            <div className="flex row items-center">
              <span>Fill the job description</span>
            </div>
            <div className="flex flex-col space-y-4">
              <Input
                label={FormConfig.company.label}
                type={FormConfig.company.type}
              />
              <Input
                label={FormConfig.role.label}
                type={FormConfig.role.type}
              />
              <Input
                label={FormConfig.job_description.label}
                type={FormConfig.job_description.type}
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
                  Generate with Magic ✨
                </button>
              </div>
            </div>

            <div className="border mt-4" />

            <Input
                label={FormConfig.cover_letter_result.label}
                type={FormConfig.cover_letter_result.type}
                value={JSON.stringify(response)}
                onChange={(event) => {
                  event.preventDefault();
                  setDescription(event.target.value);
                }}
              />
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
