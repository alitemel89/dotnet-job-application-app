"use client";

import {
  Bars3Icon,
  CommandLineIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Retrieve user object from local storage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserEmail(user.email);
    }
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 static">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Link href="/">
                  <CommandLineIcon className="h-8 w-8 mr-4 text-indigo-200" />
                </Link>

                <p className="text text-3xl font-bold tracking-wider">
                  TechHire
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="-ml-4 flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Jobs
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              {/* Add more menu items as needed */}
            </div>
          </div>
          <div className="hidden md:block">
            {/* Add additional buttons or icons here */}
          </div>
          {userEmail ? (
            <div>
              <Link href="/post" className="hidden md:block btn float-left mx-4">
                Post a Job
              </Link>
              <Link href="/post" className="hidden md:block btn-secondary float-left">
                {userEmail}
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/register" className="btn-secondary">Register</Link>
              <Link href="/signin" className="btn">Sign in</Link>
            </div>
          )}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/jobs"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Jobs
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700 mx-4 flex flex-col">
            {userEmail ? (
              <div>
                <Link href="/post" className="btn">
                  Post a Job
                </Link>
                <Link href="/post" className="btn-secondary mx-4">
                  {userEmail}
                </Link>
              </div>
            ) : (
              <div>
                <Link href="/register" className="btn-secondary">
                  Register
                </Link>
                <Link href="/signin" className="btn">
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
