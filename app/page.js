"use client";

import styles from "./page.module.css";
import "./global.css";
import classNames from "classnames";
import Link from "next/link";

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
  return (
    <main className={classNames(styles.main, "p-4 sm:p-8 h-auto")}>
      <Container margin="m-0">
        <img
          className="w-6 h-6"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/768px-Google_Chrome_icon_%28February_2022%29.svg.png"
          alt="icon"
        />
        <div className="flex row">
          <span className="font-bold">How it works</span>
          <span className="font-bold ml-4">Get started</span>
          <Link className="font-bold ml-4" href={"/sign-in"}>
            Log in
          </Link>
        </div>
      </Container>

      <Container className="h-full">Hello</Container>
    </main>
  );
}
