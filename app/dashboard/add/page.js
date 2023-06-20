"use client";

import styles from "../page.module.css";
import "../global.css";
import DashboardForm from "../../components/coverLetterForm";
import classNames from "classnames";

const Container = (props) => {
  return (
    <div
      className={classNames(
        "flex flex-row mb-4 row drop-shadow-md bg-[#FFFDF6] rounded-md w-full place-content-between justify-between",
        props.margin || "m-2",
        props.padding || "p-2"
      )}
    >
      {props.children}
    </div>
  );
};

export default function AddCoverLetter() {
  return (
    <main className={classNames(styles.main, "p-4 sm:p-8")}>
      <Container margin="m-0">
        <img
          className="w-6 h-6"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/768px-Google_Chrome_icon_%28February_2022%29.svg.png"
          alt="icon"
        />
        <div className="flex row">
          <span className="font-bold">Create Cover Letter</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
            alt="profile"
            className="w-6 h-6 ml-2"
          />
        </div>
      </Container>

      <Container>
        <DashboardForm />
      </Container>
    </main>
  );
}
