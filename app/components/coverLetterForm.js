"use client";
import EventHandler from "./EventHandler";
import { createClient } from "@supabase/supabase-js";
import CoverLetter from "./coverLetter";
import { useState } from "react";
import Container from "../profile/components/container";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);
export const MODES = {
  edit: "EDIT",
  view: "VIEW",
};

const CoverLetterForm = (props) => {
  console.log("form".props);
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
    <Container>
      <div className="flex flex-col space-y-4">
        <Link href="/dashboard">Back to dashboard</Link>
      </div>
      <form onSubmit={EventHandler} className="w-full md:p-12">
        <CoverLetter user={user} id={id} />
      </form>
    </Container>
  );
};

export default CoverLetterForm;
