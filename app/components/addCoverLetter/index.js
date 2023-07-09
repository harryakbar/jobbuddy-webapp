"use client";
import { createClient } from "@supabase/supabase-js";
import { Fragment, useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Input from "../Input";
import FormConfig from "../formConfig";
import Container from "../../profile/components/container";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

function AddCoverLetter(props) {
  const { user } = props;
  const [loading, setLoading] = useState(null);
  const [cover_letters, setCoverLetters] = useState({company_name:"", role:"", company_description:"", job_description:"", content:"", user_id:user.id});
  const [response, setResponse] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const { data, error } = await supabase
  //         .from("cover_letters")
  //         .select("*")
  //         .eq("user_id", user.id);

  //       if (error) {
  //         throw error;
  //       }

  //       setCoverLetters(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   }

  //   if (user?.id) {
  //     fetchData();
  //   }
  // }, [user]);

  const handleClick = async () => {
    // const configuration = new Configuration({
    //   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    // });
    // const openai = new OpenAIApi(configuration);
    // const company_description = cover_letters.find(
    //   (item) => item.id === id
    // ).company_description;
    // const job_description = cover_letters.find(
    //   (item) => item.id === id
    // ).job_description;

    try {
      setResponse(null);
      setLoading("cover_letter");
      const timer = setTimeout(() => {
        setLoading(null);
        setResponse("Dear Diary");
      }, 2000);
      
      //setResponse("");
      //setLoading("cover_letter");
      // const response = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: `
      //   You are a cover letter generator who masters all languages, please generate cover letter based on the following experiences and make it sophisticated. Please generate the cover letter based on the following text's main language
      //   ${job_description}
      //   `,
      //   temperature: 0.5,
      //   max_tokens: 256,
      //   top_p: 1,
      //   frequency_penalty: 0,
      //   presence_penalty: 0,
      // });

      //setResponse(response.data?.choices[0]?.text.trim()); // Store the response in state or perform any other action
    } catch (error) {
      console.error("Error:", error);
    }
    //setLoading(null);
  };

  const handleSaveData = async () => {
    // Insert      
      let { error } = await supabase.from("cover_letters").insert(cover_letters);
      if (error) {
        console.error("Error saving cover letter:", error);
      }
    }

  const handleChange = (fieldName, newValue) => {
      const updatedCoverLetters = {...cover_letters}
      updatedCoverLetters[fieldName] = newValue
      setCoverLetters(updatedCoverLetters);
    }

  return (
    <>
      <Container className="flex flex-col bg-white">
        <div className="flex flex-row items-center w-[100%] place-content-between mb-8">
          <span className="font-bold">
            Generate Your Personalized Cover Letter
          </span>
        </div>
        <span className="font-regular">Fill the job description</span>
            <Fragment>
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-2 md:space-y-0">
                <Input
                  label={FormConfig.add_cover_letter.company.label}
                  type={FormConfig.add_cover_letter.company.type}
                  value={cover_letters.company_name}
                  onChange={(event) => {
                    handleChange(
                      "company_name",
                      event.target.value
                    );
                  }}
                />
                <Input
                  label={FormConfig.add_cover_letter.role.label}
                  type={FormConfig.add_cover_letter.role.type}
                  value={cover_letters.role}
                  onChange={(event) => {
                    handleChange("role", event.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Input
                  label={FormConfig.add_cover_letter.company_description.label}
                  type={FormConfig.add_cover_letter.company_description.type}
                  value={cover_letters.company_description}
                  onChange={(event) => {
                    handleChange(
                      "company_description",
                      event.target.value
                    );
                  }}
                />
                <Input
                  label={FormConfig.add_cover_letter.job_description.label}
                  type={FormConfig.add_cover_letter.job_description.type}
                  value={cover_letters.job_description}
                  onChange={(event) => {
                    handleChange(
                      "job_description",
                      event.target.value
                    );
                  }}
                />
              </div>
                <div className="mb-8">
                  <button
                    onClick={() => handleClick()}
                    className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
                  >
                    Improve with Magic ✨
                  </button>
                </div>
            </Fragment>
      </Container>
      {loading === "cover_letter" ? (
        <Container className="bg-gray-200 w-full animate-pulse p-6">
          <div className="flex flex-col w-1/2 justify-center items-center">
            <span className="relative flex">
              <span
                className="animate-spin ease-in-out h-5 w-5 mr-3"
                viewBox="0 0 24 24"
              >
                🪄
              </span>
              Doing magic...
            </span>
          </div>
        </Container>
      ) : null}
      {response ? (
        <Container className="flex flex-col bg-white p-6">
          <div className="flex flex-row items-center w-[100%] place-content-between mb-8">
            <span className="font-bold">
              Your Cover Letter
            </span>
          </div>
          <Input
            type={FormConfig.add_cover_letter.content.type}
            value={response}
            onChange={(event) => {
              handleChange(
                "content",
                event.target.value
              );
            }}
          />
          <button
                onClick={handleSaveData}
                className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer"
              >
                💾 Save Cover Letter
              </button>
        </Container>
      ) : null}
    </>
  );
}

export default AddCoverLetter;