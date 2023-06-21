import { useEffect, useRef } from "react";

const Input = ({ label, type, onChange, value, disabled, mode }) => {
  if (mode === "VIEW") {
    return (
      <div className="flex flex-col w-full md:w-1/2 mb-8">
        <span className="font-bold">{label}</span>
        {value || "-"}
      </div>
    );
  }

  const isTextArea = type === "textarea";

  if (isTextArea) {
    const textareaRef = useRef(null);

    useEffect(() => {
      autoResize();
    }, []);

    const autoResize = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    };

    return (
      <div className="flex flex-col w-full md:w-1/2 mb-8">
        <span className="font-bold">{label}</span>
        <textarea
          ref={textareaRef}
          onChange={onChange}
          onInput={autoResize}
          type={type}
          className="border border-slate-300 rounded-md p-2"
          value={value}
          disabled={disabled}
          style={{ overflow: "hidden", height: "auto" }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full md:w-1/2 mb-8">
      <span className="font-bold">{label}</span>
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

export default Input;
