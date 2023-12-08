"use client";
import React, { useState } from "react";
import Admins from "../components/Admins";
import Pharmacists from "../components/Pharmacists";
import Patients from "../components/Patients";
import Applications from "../components/Applications";

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("admins");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderComponent = () => {
    switch (selectedTab) {
      case "admins":
        return <Admins />;
      case "pharmacists":
        return <Pharmacists />;
      case "patients":
        return <Patients />;
      case "applications":
        return <Applications />;
      default:
        return null;
    }
  };

  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("admins")}
            className={`inline-block p-4 ${
              selectedTab === "admins"
                ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Admins
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("pharmacists")}
            className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Pharmacists
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("patients")}
            className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Patients
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("applications")}
            className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
          >
            Applications
          </a>
        </li>
      </ul>
      {renderComponent()}
    </>
  );
};

export default Page;
