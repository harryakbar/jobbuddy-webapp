import classNames from "classnames";

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

export default Container;
