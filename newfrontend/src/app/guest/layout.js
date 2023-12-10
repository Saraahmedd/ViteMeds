import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <div>
        {children}
        
      </div>
    </>
  );
}
