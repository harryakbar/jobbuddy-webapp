import Image from "next/image";
import styles from "./page.module.css";
import "./global.css";

const Container = (props) => {
  return (
    <div
      className={[
        "flex p-2 mb-4 row drop-shadow-md bg-[#FFFDF6] rounded-md w-full place-content-between",
        props.margin || "p-2",
      ]}
    >
      {props.children}
    </div>
  );
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Container>
        <img
          className="w-6 h-6"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/768px-Google_Chrome_icon_%28February_2022%29.svg.png"
          alt="icon"
        />
        <div className="flex row">
          <span>Dashboard</span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
            alt="profile"
            className="w-6 h-6"
          />
        </div>
      </Container>

      <Container>
        <div className="bg-white drop-shadow-md m-10 rounded-md p-4 ">
          <h3 className="font-bold">Create Your Job Profile</h3>
          <div className="flex row items-center">
            <span>LinkedIn Profile</span>
            <button className="ml-2 text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">
              Fill Profile with LinkedIn
            </button>
          </div>
          <div className="flex flex-col">
            <span>Name</span>
            <input type="text" className="border border-slate-300 rounded-md" />

            <span>Email</span>
            <input
              type="email"
              className="border border-slate-300 rounded-md"
            />

            <span>Phone Number</span>
            <input
              type="phone"
              className="border border-slate-300 rounded-md mb-2"
            />
            <div className="border"></div>
            <div>Experiences</div>

            <span>Company Name</span>
            <input type="text" className="border border-slate-300 rounded-md" />
            <span>Role</span>
            <input type="text" className="border border-slate-300 rounded-md" />
            <span>Start Date</span>
            <input type="date" className="border border-slate-300 rounded-md" />

            <span>End Date</span>
            <input type="date" className="border border-slate-300 rounded-md" />
            <span>Description</span>
            <textarea className="border border-slate-300 rounded-md" />
          </div>
        </div>
      </Container>
    </main>
  );
}
