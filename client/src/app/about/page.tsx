import {
  ArrowLeftCircleIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <div className="bg-slate-700 p-10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <h1 className="md:text-3xl text-xl text-white font-bold text-center mb-6 flex items-center mr-4">
            Welcome to
            <span className="flex items-center">
              <Link href="/">
                <CommandLineIcon className="h-8 w-8 text-indigo-200 ml-4" />
              </Link>
              <p className="text text-3xl font-bold tracking-wider">TechHire</p>
            </span>
          </h1>
        </div>

        <p className="md:text-lg text-md text-center text-emerald-400 mb-8">
          Simplify your hiring process and find the perfect candidates for your
          job openings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center">
            <img
              src="/images/feature1.jpg"
              alt="Feature 1"
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div className="ml-4">
              <h2 className="md:text-lg text-md font-semibold text-white">
                Efficient Job Applications
              </h2>
              <p className="text-emerald-200 font-light">
                Our platform streamlines the job application process, allowing
                applicants to easily submit their resumes and other required
                documents.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="/images/feature2.jpg"
              alt="Feature 2"
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div className="ml-4">
              <h2 className="md:text-lg text-md font-semibold text-white">
                Comprehensive Job Listings
              </h2>
              <p className="text-emerald-200 font-light">
                Employers can create detailed job listings with specific
                requirements, qualifications, and job descriptions to attract
                top talent.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="/images/feature3.jpg"
              alt="Feature 3"
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div className="ml-4">
              <h2 className="md:text-lg text-md font-semibold text-white">
                Advanced Candidate Search
              </h2>
              <p className="text-emerald-200 font-light">
                Our platform offers powerful search and filtering options,
                allowing employers to quickly find the most qualified candidates
                for their job openings.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              src="/images/feature4.jpg"
              alt="Feature 4"
              className="w-32 h-32 rounded-xl object-cover"
            />
            <div className="ml-4">
              <h2 className="md:text-lg text-md font-semibold text-white">
                Secure and Reliable
              </h2>
              <p className="text-emerald-200 font-light">
                We prioritize the security and privacy of your data, ensuring a
                safe and reliable platform for both employers and applicants.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
      <Link href="/" className="btn text-xl">
        Search for Jobs
      </Link>
      </div>
    </div>
  );
};

export default AboutPage;
