"use client"
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import { fetchData } from "../redux/getMe";
import { FaComment } from "react-icons/fa";
import { useState } from "react";
import ChatPanel from "@/components/chatModal";
import { initSocket } from "../redux/actions/socketActions";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardLayout({ children }) {
  const [showChatPanel, setShowChatPanel] = useState(false);

  const { connected } = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();

  const handleChatIconClick = () => {
    setShowChatPanel(true);

    dispatch(initSocket());
  };

  const handleCloseChatPanel = () => {
    setShowChatPanel(false);
  };
  return (
    <>
      <Sidebar />
      <div className="p-[32px] sm:ml-64 flex flex-col">{children}</div>
      <div
        className="chat-icon"
        onClick={handleChatIconClick}
        data-tip="Get Help from one of our pharmacists"
      >
        <FaComment />
      </div>

      {/* Chat Panel */}
      <ChatPanel isOpen={showChatPanel} handleClose={handleCloseChatPanel} />
    </>
  );
}
