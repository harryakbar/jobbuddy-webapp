"use client";
import "../global.css";
import classNames from "classnames";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

const Container = (props) => {
  return (
    <div
      className={classNames(
        "flex flex-row mb-4 row drop-shadow-md bg-[#FFFDF6] rounded-md place-content-between justify-between",
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
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const response = supabase.auth?.onAuthStateChange((_, session) => {
      if (session) {
        router.push("/profile");
        setUser(session.user);
      }
    });
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
      router.push("/profile");

      console.log("User signed in with Google:", user);
    }
  };

  return (
    <main className="flex column h-screen bg-white">
      <div className="w-1/2 p-10 flex items-center content-center">
        <article className="italic">
          Hey there! Have any questions or feedback? Reach out to us on Twitter!
          We love engaging with our users like you and hearing your thoughts.
          Let&apos;s connect and make your job search experience even better
          with MyJobBuddy!
        </article>
      </div>

      <Container className="w-1/2 p-10 flex items-center content-center">
        <div>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      </Container>
    </main>
  );
}
