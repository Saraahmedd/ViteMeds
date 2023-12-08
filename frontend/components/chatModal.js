import { sendMessage } from "@/app/redux/actions/socketActions";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaComment, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

// ChatPanel component
const ChatPanel = ({ isOpen, handleClose }) => {
  const [message, setMessage] = useState("");

  const messages = useSelector((state) => state.socketReducer.messages);

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

  return (
    <div className={`chat-panel ${isOpen ? "open" : ""}`}>
      <div className="chat-header">
        <div className="close-button" onClick={handleClose}>
          <FaTimes />
        </div>
        <div className="chat-title">
          <FaComment className="mr-2" />
          Chat
        </div>
      </div>
      <div style={{ height: isOpen ? "400px" : "0px" }} className="chat-body">
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
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>
          <FaPaperPlane width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
