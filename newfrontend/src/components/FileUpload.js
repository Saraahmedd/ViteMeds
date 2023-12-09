"use client"
const { Button } = require("@tremor/react");
const { useState } = require("react");

function FileUpload({callBackFiles}) {
    const [text, setText] = useState("");
    function onUpload(e) {
        console.log(e);
        setText(e.target.value);
        callBackFilePath(e.target.files);
    }

    return (
        <>
            <input multiple={true} onChange={onUpload} id="newphoto" type="file" hidden />

            <label for="newphoto" id="newphotolabel"></label>
            <p className="my-2">{text}</p>
            <Button onClick={() => {
                document.getElementById("newphotolabel").click();
            }} className="w-full"><span className="text-white">Upload New Photo</span></Button>
        </>
    )
}

module.exports = {
    FileUpload
}