import styles from "./page.module.css";
import "./global.css";
import Form from "./components/form";

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
        <Form />
      </Container>
    </main>
  );
}
