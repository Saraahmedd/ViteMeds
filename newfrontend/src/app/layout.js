"use client";
import Header from "@/components/Header";
import "./globals.css";
import localFont from "next/font/local";
import { ReduxProvider } from "./redux/provider";
import Footer from "@/components/Footer";
import { useEffect } from "react";

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

// const role = JSON.parse(localStorage.getItem("userInfo")).data.user.role;

export default function RootLayout({ children }) {
  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.setAttribute("autocomplete", "off");
    });

    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.setAttribute("autocomplete", "off");
    });
  });
  return (
    <html lang="en" className="dark">
      <body className={myFont.className + " min-h-screen flex flex-col"}>
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}