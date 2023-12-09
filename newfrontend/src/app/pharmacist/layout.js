import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import { fetchData } from "../redux/getMe";

export default async function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="p-[32px] sm:ml-64 flex flex-col">{children}</div>
    </>
  );
}
