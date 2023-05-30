"use client";
import Image from "next/image";
import styles from "../page.module.css";
import "../global.css";
import DashboardForm from "../components/dashboardForm";
import classNames from "classnames";
import EventHandler from "../components/EventHandler";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

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

// const Input = (props) => {
//   const { label, type, onChange, value } = props;
//   const isTextArea = type === "textarea";

//   if (isTextArea) {
//     return (
//       <div className="flex flex-col w-full">
//         <span>{label}</span>
//         <textarea
//           onChange={onChange}
//           type={type}
//           value={JSON.stringify(value)}
//           className="border border-slate-300 rounded-md"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col w-full">
//       <span>{label}</span>
//       <input
//         onChange={onChange}
//         type={type}
//         className="border border-slate-300 rounded-md"
//       />
//     </div>
//   );
// };

// const FormConfig = {
//   // Job
//   company: {
//     label: "Company Name",
//     type: "text",
//   },
//   role: {
//     label: "Role",
//     type: "text",
//   },
//   job_description: {
//     label: "Description",
//     type: "textarea",
//   },
//   cover_letter_result: {
//     label: "Your Cover Letter",
//     type: "textarea",
//   }
// };

export default function Dashboard() {
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

