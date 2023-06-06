const Input = ({ label, type, onChange, value, disabled }) => {
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

export default Input;
