"use client";

import styles from "./page.module.css";
import "./global.css";
import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

const Container = (props) => {
  return (
    <div
      className={classNames(
        "flex flex-row mb-4 row drop-shadow-md bg-[#FFFDF6] rounded-md w-full place-content-between justify-between",
        props.margin || "m-2",
        props.padding || "p-2",
        props.className || ""
      )}
    >
      {props.children}
    </div>
  );
};

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const response = supabase.auth?.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session.user);
      }
    });
    return () => {
      if (typeof response?.data?.unsubscribe === "function") {
        response?.data?.unsubscribe();
      }
    };
  }, []);

  return (
    <main className={classNames(styles.main, "p-4 sm:p-8 h-auto space-y-8")}>
      <Container margin="m-0">
        <img
          className="w-6 h-6"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/768px-Google_Chrome_icon_%28February_2022%29.svg.png"
          alt="icon"
        />
        <div className="flex row">
          <span className="font-bold">How it works</span>
          <span className="font-bold ml-4">Get started</span>
        </div>
      </Container>

      <div className="bg-[#8EB8E2] w-full rounded-xl flex row p-8 h-[707px] relative">
        <article className="w-[450px] h-full flex justify-center  flex-col">
          <h1 className="text-white font-bold text-6xl">
            Outshine Your Peers!
          </h1>
          <p className="text-white my-4">
            Create personalized cover letters effortlessly with JobApplyBuddy.
            Match your skills and experiences to the job description, standing
            out from the competition.
          </p>
          <div className="mt-6">
            <Link
              href={"/sign-in"}
              className="text-black font-bold bg-white p-4 mt-2 rounded-lg"
            >
              Discover the Magic for Free
            </Link>
          </div>
        </article>
        <Image
          src={"/waving.png"}
          width={678}
          height={707}
          className="absolute bottom-0 right-0 rounded-br-xl"
        />
      </div>

      <section className="flex flex-col items-center space-y-6 w-full">
        <h2 className="font-bold text-4xl">How it Works</h2>
        <div className="flex row w-full place-content-between justify-between">
          <div className="space-y-4 max-w-[350px]">
            <Image
              src="/how-it-works.png"
              width={350}
              height={350}
              className="rounded-xl mb-4"
            />
            <span className="font-bold mt-10">Make your profile</span>
            <p>
              Complete your profile with your skills, experiences,
              achievements—just once, at first.
            </p>
          </div>
          <div className="space-y-4 max-w-[350px]">
            <Image
              src="/how-it-works.png"
              width={350}
              height={350}
              className="rounded-xl mb-4"
            />
            <span className="font-bold mt-10">Enter job description</span>
            <p>
              Share the role and job description you want to apply for, and
              we'll customize your cover letter to fit perfectly.
            </p>
          </div>
          <div className="space-y-4 max-w-[350px]">
            <Image
              src="/how-it-works.png"
              width={350}
              height={350}
              className="rounded-xl mb-4"
            />
            <span className="font-bold mt-10">Generate cover letter</span>
            <p>
              Let us work our magic and create a strong, customized cover
              letter, making your profile shine in the crowd.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center">
        <h2 className="font-bold text-4xl mt-8 mb-10">Start Now</h2>
        <h4 className="text-3xl mb-10">
          Make your profile and start your job application today!
        </h4>
        <Link
          className="mt-4 rounded-md text-white px-4 sm:px-8 py-2 sm:py-3 bg-[#8EB8E2] cursor-pointer mb-12"
          href={"/sign-in"}
        >
          Sign up for free
        </Link>
      </section>

      <Container margin="m-0">
        <span>© JobApplyBuddy.com</span>
        <div className="flex row">
          <Link className="font-bold ml-4" href={"/sign-in"}>
            Open App
          </Link>
          <span className="font-bold ml-4">FAQ</span>
          <span className="font-bold ml-4">Twitter</span>
        </div>
      </Container>
    </main>
  );
}
