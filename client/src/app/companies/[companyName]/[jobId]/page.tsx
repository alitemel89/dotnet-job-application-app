import {
  ArrowLeftCircleIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  params: { companyName: string; jobId: string };
}

async function JobDetailsPage({ params: { companyName, jobId } }: Props) {
  // fetch data from server with parameter jobId and companyName
  async function getJob() {
    const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`); // The result is cached
    return res.json();
  }

  const job = await getJob();

  return (
    <div className="bg-slate-100 min-h-screen">
      {/* Hero section */}

      <div className="flex justify-center">
        <div className="relative top-0 h-[40vh] w-full filter brightness-50 opacity-80">
          <Image
            src="/images/hero.jpg"
            alt="hero-image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="text-white absolute top-10 p-10">
          <h1 className="text-5xl font-bold mb-4">{job.position}</h1>
          <div className="flex items-center rounded-full">
            <Image
              src="/images/company-logo.png"
              alt="Company Logo"
              width={50}
              height={50}
            />
            <p className="text-lg ml-4 text-center">{decodeURI(companyName)}</p>
          </div>
        </div>
      </div>

      {/* Job details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between mb-4">
            <Link href="/">
              <div className="flex items-center space-x-1">
                <ArrowLeftCircleIcon className="w-8 h-8 cursor-pointer" />
                <p>Back to Jobs</p>
              </div>
            </Link>
            <div className="flex space-x-4">
              <Link href="/share" className="btn-secondary text-emerald-400 flex items-center space-x-2">
                <p>Share</p>
                <ShareIcon className="w-4 h-4 text-emerald-400" />
              </Link>
              <Link
                href="/application"
                className="btn flex items-center space-x-2"
              >
                <p>Apply</p>
                <PaperAirplaneIcon className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
          <h2 className="text-lg font-bold mb-4">Job Description</h2>
          <h3 className="mb-8 text-2xl text-blue-950 font-semibold">{job.position}</h3>
          <p className="text-gray-600">
            {job.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
