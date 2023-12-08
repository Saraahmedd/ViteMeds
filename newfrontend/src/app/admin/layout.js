import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar role={"admin"} />
      <div className="p-[32px] sm:ml-64 min-h-screen flex flex-col">
        {children}
        <Footer />
      </div>
    </>
  );
}
