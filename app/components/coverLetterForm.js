"use client";
import EventHandler from "./EventHandler";
import { createClient } from "@supabase/supabase-js";
import CoverLetter from "./coverLetter";
import { useState } from "react";
import { useRouter } from 'next/router';
import Container from "../profile/components/container";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);
export const MODES = {
  edit: "EDIT",
  view: "VIEW",
};

const CoverLetterForm = (props) => {
  console.log("form". props)
  const { id } = props;
  const { user } = props;
  const [mode, setMode] = useState(MODES.view);

  const handleEditProfile = () => {
    setMode(MODES.edit);
  };
  const handleSaveProfile = () => {
    setMode(MODES.view);
  };

  return (
    <form onSubmit={EventHandler} className="w-full md:p-12">

      <Container className="flex flex-col bg-white p-6">
        <CoverLetter user={user} id={id} />
      </Container>

      <div className="border mt-4" />
      <input
        type="submit"
        className="mt-4 rounded-md text-white px-4 sm:px-8 py-2 sm:py-3 bg-[#8EB8E2] cursor-pointer"
        value="Save Profile"
      />
    </form>
  );
};

export default CoverLetterForm;
