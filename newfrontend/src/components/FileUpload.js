"use client";
const { Button } = require("@tremor/react");
const { useState } = require("react");

function FileUpload({
  callBackFiles,
  variant = "primary",
  buttonText = "Upload",
}) {
  const [text, setText] = useState("");
  function onUpload(e) {
    // console.log(e);
    setText(e.target?.files[0]?.name);
    callBackFiles(e.target?.files[0]);
  }

  return (
    <>
      <input
        multiple={true}
        onChange={onUpload}
        id={buttonText}
        type="file"
        hidden
      />

      <label for={buttonText} id={buttonText + "label"}></label>
      <p className="my-2"></p>
      <Button
        variant={variant}
        onClick={() => {
          document.getElementById(buttonText + "label").click();
        }}
        className="w-full"
      >
        <span className="text-white">{text ? text : buttonText}</span>
      </Button>
    </>
  );
}

module.exports = {
  FileUpload,
};
