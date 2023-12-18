"use client"
import React, { useEffect, useState } from "react";

const Footer = ({ role }) => {
  let fullFooter = false;

  const dirs = window.location.href.split('/');
  if (dirs.includes("signup") || dirs.includes("guest") || dirs.includes("pharmacistWaiting") || window.location.href == "http://localhost:3000/landing" || window.location.href == "http://127.0.0.1:3000/landing" || window.location.href == "http://localhost:3001/landing" || window.location.href == "http://127.0.0.1:3001/landing") {
    fullFooter = true;
  }


  return (
    <div className={`mt-auto ${fullFooter ? '' : 'sm:ml-64'}`}>
      <footer className=" rounded-lg shadow dark:bg-gray-900 ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="#"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Vite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Vite
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="/" className="hover:underline me-4 md:me-6">
                  Home
                </a>
              </li>
              <li>
                <a href="/policy" className="hover:underline me-4 md:me-6">
                  Policy
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="#" className="hover:underline">
              Pharmacy
            </a>
          </span>
          All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Footer;
