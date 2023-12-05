"use client";
import { Inter } from "next/font/google";
import { ReduxProvider } from "../redux/provider";
import PharmacistNavbar from "../../../components/PharmacistNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import ChatPanel from "../../../components/chatModal";
import "../patients/patient.css";
import { initSocket } from "../redux/actions/socketActions";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [showChatPanel, setShowChatPanel] = useState(false);

  const { connected } = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();

  const handleChatIconClick = () => {
    setShowChatPanel(true);
    if (!connected) {
      dispatch(initSocket());
    }
  };

  const handleCloseChatPanel = () => {
    setShowChatPanel(false);
  };
  return (
    <div className={`global-text ${inter.className}`}>
      <PharmacistNavbar />
      <div className="p-2 m-5">
        <ReduxProvider> {children} </ReduxProvider>
      </div>
      <div
        className="chat-icon"
        onClick={handleChatIconClick}
        data-tip="Get Help from one of our pharmacists"
      >
        <FaComment />
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={showChatPanel} handleClose={handleCloseChatPanel} />
    </div>
  );
}
