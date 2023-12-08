import Header from "@/components/Header";
import "./globals.css";
import localFont from "next/font/local";

export const metadata = {
  title: "Seaats Panel - Login",
  description: "Login to Seaats",
};

import { ReduxProvider } from "./redux/provider";

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
    <html lang="en" className="min-h-screen">
      <body className={myFont.className + " min-h-screen"}>
        <ReduxProvider>{children} </ReduxProvider>
      </body>
    </html>
  );
}
