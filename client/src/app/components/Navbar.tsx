"use client";

import {
  Bars3Icon,
  CommandLineIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

                <p className="text text-3xl font-bold tracking-wider">TechHire</p>
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
            <button className="btn-secondary">Register</button>
            <button className="btn ml-4">Sign In</button>
          </div>
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
            {/* Add more menu items as needed */}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700 mx-4 flex flex-col">
            {/* Add additional buttons or icons here */}
            <button className="my-4 btn-secondary">Register</button>
            <button className="btn">Sign In</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
