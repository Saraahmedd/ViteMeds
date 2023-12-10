import Header from "@/components/Header";
import "./globals.css";
import localFont from "next/font/local";

export const metadata = {
  title: "Pharmacy",
  description: "Pharmacy",
};

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={myFont.className + " min-h-screen flex flex-col "}>
        <ReduxProvider>{children} </ReduxProvider>
        {/* <div className="flex-1 grow"></div> */}
        <Footer />
      </body>
    </html>
  );
}
