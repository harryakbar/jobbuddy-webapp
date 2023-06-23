"use client";
import { createClient } from "@supabase/supabase-js";
import { Fragment, useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Input from "../Input";
import FormConfig from "../formConfig";
import { MODES } from "../form";
import Container from "../../profile/components/container";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

function CoverLetter(props) {
  const { user } = props;
  console.log("index", props)
  const { id } = props;
  const [loading, setLoading] = useState(null);
  const [cover_letters, setCoverLetters] = useState([]);
  const [response, setResponse] = useState(null);
  const [mode, setMode] = useState(MODES.view);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("cover_letters")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        setCoverLetters(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    if (user?.id) {
      fetchData();
    }
  }, [user, id]);

  const handleClick = async (id) => {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const company_description = cover_letters.find((item) => item.id === id).company_description;
    const job_description = cover_letters.find((item) => item.id === id).job_description;

    try {
      setResponse("");
      setLoading("cover_letter");
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `
        You are a cover letter generator who masters all languages, please generate cover letter based on the following experiences and make it sophisticated. Please generate the cover letter based on the following text's main language
        ${job_description}
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

  const handleChange = (fieldName, id, newValue) => {
    const index = cover_letters.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedCoverLetters = [...cover_letters];
      updatedCoverLetters[index] = {
        ...updatedCoverLetters[index],
        [fieldName]: newValue,
      };
      setCoverLetters(updatedCoverLetters);
    }
  };

  const handleEditCoverLetter = () => {
    setMode(MODES.edit);
  };

  const handleSaveData = async () => {
    setMode(MODES.view);
  };

  return (
    <>
      <div className="flex flex-row items-center w-[100%] place-content-between mb-8">
        <span className="font-bold">
          Generate Your Personalized Cover Letter
        </span>
        <span className="font-regular">Fill the job description</span>
        {mode === MODES.edit ? (
          <button
            onClick={handleSaveData}
            className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
          >
            💾 Save Cover Letter
          </button>
        ) : (
          <button
            onClick={handleEditCoverLetter}
            className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
          >
            ✏️ Edit
          </button>
        )}
      </div>
      <div className="border-l-4 pl-6 pb-0 mb-0">
        {cover_letters &&
          Array.isArray(cover_letters) &&
          cover_letters.map((cover_letter) => (
            <Fragment key={cover_letters.id}>
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
                <Input
                  mode={mode}
                  label={FormConfig.cover_letter.company.label}
                  type={FormConfig.cover_letter.company.type}
                  value={cover_letter.company_name}
                  onChange={(event) => {
                    handleChange(
                      "company_name",
                      cover_letter.id,
                      event.target.value
                    );
                  }}
                />
                <Input
                  mode={mode}
                  label={FormConfig.cover_letter.role.label}
                  type={FormConfig.cover_letter.role.type}
                  value={cover_letter.position}
                  onChange={(event) => {
                    handleChange("role", cover_letter.id, event.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Input
                  mode={mode}
                  label={FormConfig.cover_letter.company_description.label}
                  type={FormConfig.cover_letter.company_description.type}
                  value={cover_letter.company_description}
                  onChange={(event) => {
                    handleChange(
                      "company_description",
                      cover_letter.id,
                      event.target.value
                    );
                  }}
                />
                <Input
                  mode={mode}
                  label={FormConfig.cover_letter.job_description.label}
                  type={FormConfig.cover_letter.job_description.type}
                  value={cover_letter.job_description}
                  onChange={(event) => {
                    handleChange(
                      "job_description",
                      cover_letter.id,
                      event.target.value
                    );
                  }}
                />
              </div>
              {mode === MODES.edit && (
                <div className="mb-8">
                  <button
                    onClick={() => handleClick(cover_letter.id)}
                    className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
                  >
                    Improve with Magic ✨
                  </button>
                </div>
              )}
              {loading === "cover_letter" ? (
                <Container className="flex flex-col bg-white p-6">
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
                </Container>
              ) : null}
              {response ? (
                <Input
                  mode={mode}
                  label="Your Cover Letter"
                  type={FormConfig.cover_letter.content.type}
                  value={response}
                />
              ) : null}
            </Fragment>
          ))}
      </div>
    </>
  );
}
export default CoverLetter;
