import React from "react";

const Footer = () => {
  return (
    <footer className="rounded-lg shadow dark:bg-gray-900 my-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"/>
              Pharmacy
            </a>
            . All Rights Reserved.
          
        </div>
        </div>
      </footer>
    
  );
};

export default Footer;
