import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div className="px-5 pb-5 flex flex-col grow flex-1">
        {children}
        
      </div>
    </>
  );
}