"use client";
import { useState } from "react";
import EventHandler from "./EventHandler";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import Input from "./Input";
import FormConfig from "./formConfig";
import Experience from "./experience";
import Education from "./education";
import Achievement from "./achievement";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

const Form = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const response = supabase.auth?.onAuthStateChange(
      (_, session) => {
        if (session) {
          setUser(session.user);
        }
      }
    );
    return () => {
      if (typeof response?.data?.unsubscribe === "function") {
        response?.data?.unsubscribe();
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in with Google:", error);
    } else {
      console.log("User signed in with Google:", user);
    }
  };

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

  return (
    <form onSubmit={EventHandler} className="w-full md:p-12">
      <div className="bg-white drop-shadow-md rounded-md p-4 w-full">
        {user ? (
          user.user_metadata.full_name
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )}
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

          <div className="border" />
          <Experience user={user} />

          <div className="border" />
          <Education user={user} />

          <div className="border" />
          <Achievement user={user} />
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
