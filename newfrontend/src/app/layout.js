"use client"
import Header from "@/components/Header";
import "./globals.css";
import localFont from "next/font/local";
import { ReduxProvider } from "./redux/provider";
import Footer from "@/components/Footer";

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/FreeSans.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FreeSansBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/FreeSansOblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/FreeSansBoldOblique.woff",
      weight: "600",
      style: "italic",
    },
  ],
});

const role = JSON.parse(localStorage.getItem("userInfo")).data.user.role;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={myFont.className + " min-h-screen flex flex-col"}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Footer role={role} />
      </body>
      <script src="/jquery-3.7.1.min.js" type="text/javascript"></script>
      <script>
        $(document).ready(function(){
          $('input').attr('autocomplete','off');
          $('form').attr('autocomplete','off');
        });
      </script>
    </html>
  );
}
