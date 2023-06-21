"use client";
import styles from "../page.module.css";
import "../global.css";
import Form from "../components/form";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Container from "./components/container";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

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
    <main className={classNames(styles.main, "p-4 sm:p-8")}>
      <Container margin="m-0">
        <img
          className="w-6 h-6"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/768px-Google_Chrome_icon_%28February_2022%29.svg.png"
          alt="icon"
        />
        <div className="flex row">
          <span className="font-bold">Dashboard</span>
        </div>
      </Container>

      <Container className="min-h-screen">
        {user ? <Form user={user} /> : "Loading..."}
      </Container>
    </main>
  );
}
