import React from "react";

const Header = () => {
  return (
    <>
      <div className="w-full min-h-24 p-5">
        <nav className="w-full h-full bg-gray-900 flex py-8 rounded-lg px-8 items-center justify-between">
          <div className="flex">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Pharmacy Logo"
            />

            <span className="ms-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Vite
            </span>
          </div>

          <div>
            <ul class="list-none">
              <li class="inline mx-2">
                <a href="/" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li class="inline mx-2">
                <a href="/signup/pharmacist" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li class="inline mx-2">
                <a href="/signup/patient" className="hover:text-gray-400">
                  Sign Up
                </a>
              </li>
              <li class="inline mx-2">
                <a href="/guest/login" className="hover:text-gray-400">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
