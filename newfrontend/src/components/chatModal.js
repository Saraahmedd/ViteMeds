import { CrossSendMessage, sendMessage } from "@/app/redux/actions/socketActions";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaComment, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@tremor/react";

// ChatPanel component
const ChatPanel = ({ isOpen, handleClose }) => {
  const [message, setMessage] = useState("");
  const [crossMessage,setCrossMessage] = useState("");
  const [pharmacy,setPharmacy] = useState("");
  const [clinic,setClinic] = useState("");
  const messages = useSelector((state) => state.socketReducer.messages);
  const crossMessages = useSelector((state) => state.crossSocketReducer.messages);

  useEffect(() => {
    console.log(messages);
  });

  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return; // Prevent sending empty messages
    }

    // Dispatch the action to send the message to the server
    console.log(JSON.parse(localStorage.getItem("userInfo")).data.user._id);
    dispatch(
      sendMessage({
        sender: JSON.parse(localStorage.getItem("userInfo")).data.user._id,
        receiver: "agent", // Adjust as needed
        content: message,
      })
    );

    // Clear the input field after sending the message
    setMessage("");
  };


  const selectPharmacy = () => {
      setPharmacy(true);
      setClinic(false);
  }

  const selectClinic = () => {
    setClinic(true);
    setPharmacy(false);
}


  const handleCrossSendMessage = () => {
    if (crossMessage.trim() === "") {
      return; // Prevent sending empty messages
    }

    // Dispatch the action to send the message to the server
    console.log(JSON.parse(localStorage.getItem("userInfo")).data.user._id);
    dispatch(
      CrossSendMessage({
        sender: JSON.parse(localStorage.getItem("userInfo")).data.user._id,
        receiver: "agent", // Adjust as needed
        content: crossMessage,
      })
    );

    // Clear the input field after sending the message
    setCrossMessage("");
  };

  return (
    <div className={`chat-panel ${isOpen ? "open" : ""}`}>
      <div className="chat-header">
        <div className="close-button" onClick={handleClose}>
          <FaTimes />
        </div>
        <div className="chat-title">
          <Button onClick={selectPharmacy}>
              Pharmacy
          </Button>
          <Button onClick={selectClinic}>
              Clinic
          </Button>
        </div>
      </div>
      <div style={{ height: isOpen ? "400px" : "0px" }} className="chat-body">
        {pharmacy ? (
          <>
          <div className="message-area">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                JSON.parse(localStorage.getItem("userInfo")).data.user._id ===
                msg.sender
                  ? `message user`
                  : "message agent"
              }
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex">
        <input
          className="w-[15rem] px-2 py-1 border border-gray-700 chatBorder rounded text-black"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button ml-3" onClick={handleSendMessage}>
              <div className="flex items-center justify-center">
                <FaPaperPlane width={25} height={25} />
              </div>
        </button>
        </div>
        </>
        ) : (
          <>
          <div className="message-area">
          {crossMessages.map((msg) => (
            <div
              key={msg.id}
              className={
                JSON.parse(localStorage.getItem("userInfo")).data.user._id ===
                msg.sender
                  ? `message user`
                  : "message agent"
              }
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex">
        <input
          className="w-[15rem] px-2 py-1 border border-gray-700 chatBorder rounded text-black"
          type="text"
          placeholder="Type your message..."
          value={crossMessage}
          onChange={(e) => setCrossMessage(e.target.value)}
        />
        <button className="send-button ml-3" onClick={handleCrossSendMessage}>
              <div className="flex items-center justify-center">
                <FaPaperPlane width={25} height={25} />
              </div>
        </button>
        </div>
        </>
        )}
        
      </div>
    </div>
  );
};

export default ChatPanel;
