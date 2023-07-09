"use client";
import EventHandler from "./EventHandler";
import { createClient } from "@supabase/supabase-js";
import AddCoverLetter from "./addCoverLetter";
import Container from "../profile/components/container";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

const AddCoverLetterForm = (props) => {
  const { user } = props;

  return (
    <Container>
      <div className="flex flex-col space-y-4">
        <Link href="/dashboard">Back to dashboard</Link>
      </div>
      <form onSubmit={EventHandler} className="w-full md:p-12">
        <AddCoverLetter user={user} />
      </form>
    </Container>
  );
};

export default AddCoverLetterForm;