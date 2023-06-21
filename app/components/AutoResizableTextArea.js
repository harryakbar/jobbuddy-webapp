import React, { useState, useEffect, useRef } from "react";

const AutoResizableTextarea = (props) => {
  const textareaRef = useRef(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      onInput={autoResize}
      style={{ overflow: "hidden", resize: "none" }}
      {...props}
    />
  );
};

export default AutoResizableTextarea;
