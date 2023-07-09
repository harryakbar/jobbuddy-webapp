"use client";
import EventHandler from "./EventHandler";
import { createClient } from "@supabase/supabase-js";
import Input from "./Input";
import FormConfig from "./formConfig";
import Experience from "./experience";
import Education from "./education";
import Achievement from "./achievement";
import { useState } from "react";
import Container from "../profile/components/container";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);
export const MODES = {
  edit: "EDIT",
  view: "VIEW",
};

const Form = (props) => {
  const { user } = props;
  const [mode, setMode] = useState(MODES.view);

  const handleSubmit = async () => {
    // Save the experience data to Supabase
    const { data, error } = await supabase.from("experiences").insert([
      {
        position: "Software Engineer",
        company_name: "Google",
        start_date: "2023-04-17",
        end_date: null,
        is_current: true,
        user_id: user.id,
        description,
      },
    ]);

    if (error) {
      console.error("Error saving experience:", error);
    } else {
      console.log("Experience saved successfully:", data);
      // Perform any necessary actions after saving the experience
    }
  };

  const handleEditProfile = () => {
    setMode(MODES.edit);
  };
  const handleSaveProfile = () => {
    setMode(MODES.view);
  };
  const handleCancelEditingProfile = () => {
    setMode(MODES.view);
  };

  return (
    <form onSubmit={EventHandler} className="w-full md:p-12">
      <Container className="flex flex-col bg-white p-6">
        <div className="flex row place-content-between w-full">
          <h3 className="font-bold">Your Profile</h3>
          {mode === MODES.edit ? (
            <div className="space-x-4">
              <button
                onClick={handleCancelEditingProfile}
                className="rounded-md text-[#F36868] p-2 border-2 border-[#F36868] cursor-pointer font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer space-x-2"
              >
                <span>💾</span>
                <span>Save Profile</span>
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

        {mode === MODES.edit && (
          <div className="flex row items-center my-4">
            <button className="ml-2 rounded-md text-white p-2 bg-[#8EB8E2] cursor-pointer hover:bg-sky-900 hover:scale-105 transition ease-in-out delay-150">
              Fill Profile with LinkedIn
            </button>
          </div>
        )}
        <div className="flex flex-col space-y-4">
          <Input
            label={FormConfig.name.label}
            type={FormConfig.name.type}
            value={user.user_metadata.full_name}
            mode={mode}
          />
          <div className="flex row space-x-4">
            <Input
              label={FormConfig.email.label}
              type={FormConfig.email.type}
              mode={mode}
            />
            <Input
              label={FormConfig.phone.label}
              type={FormConfig.phone.type}
              mode={mode}
            />
          </div>
          <div className="flex row space-x-4">
            <Input
              label={FormConfig.website.label}
              type={FormConfig.website.type}
              mode={mode}
            />
            <Input
              label={FormConfig.location.label}
              type={FormConfig.location.type}
              mode={mode}
            />
          </div>
          <Input
            label={FormConfig.profile_summary.label}
            type={FormConfig.profile_summary.type}
            mode={mode}
          />
        </div>
      </Container>

      <Container className="flex flex-col bg-white p-6">
        <Experience user={user} />
      </Container>

      <Container className="flex flex-col bg-white p-6">
        <Education user={user} />
      </Container>

      <Container className="flex flex-col bg-white p-6">
        <Achievement user={user} />
      </Container>
    </form>
  );
};

export default Form;
