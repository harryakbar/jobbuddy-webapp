"use client";
import "../global.css";
import classNames from "classnames";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useReducer, useState } from "react";
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

const Input = (props) => {
  const { label, type, onChange, value, disabled, isMagic } = props;
  const isTextArea = type === "textarea";

  if (isTextArea) {
    return (
      <div className="flex flex-col w-full md:w-1/2">
        <span>{label}</span>
        <textarea
          onChange={onChange}
          type={type}
          className="border border-slate-300 rounded-md p-2"
          value={value}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-1/2">
      <span>{label}</span>
      <input
        onChange={onChange}
        type={type}
        className="border border-slate-300 rounded-md p-2"
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

const FormConfig = {
  // Sign In
  email: {
    label: "Email",
    type: "email",
  },
  password: {
    label: "Password",
    type: "password",
  },
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(user)
  const signInWithPassword = async () => {
    try {
      // Sign in with email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      console.log(user)
      if (error) {
        console.error("Error signing in:", error.message);
        return;
      }

      // Sign-in successful
      router.push("/dashboard");
      console.log("Sign in successful!");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

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
          <div>
            <Input
              label={FormConfig.email.label}
              type={FormConfig.email.type}
              placeholder="Email"
              onChange={(event) => {
                event.preventDefault();
                setEmail(event.target.value);
              }}
            />
            <Input
              label={FormConfig.password.label}
              type={FormConfig.password.type}
              placeholder="Type Your Password"
              onChange={(event) => {
                event.preventDefault();
                setPassword(event.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={signInWithPassword}>
              Sign In
            </button>
          </div>
          <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          </div>
        </div>
      </Container>
    </main>
  );
}
