import AutoResizableTextarea from "./AutoResizableTextArea";

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
    return (
      <div className="flex flex-col w-full md:w-1/2 mb-8">
        <span className="font-bold">{label}</span>
        <AutoResizableTextarea
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
