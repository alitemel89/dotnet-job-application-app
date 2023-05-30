import Image from "next/image";
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
    <div className="bg-gray-100 min-h-screen">
      {/* Hero section */}

      <div className="flex justify-center">
        <div className="relative top-0 h-[50vh] w-full opacity-80 blur-sm">
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
          <div className="flex justify-center mb-4 space-x-2">
            <button className="btn">Share</button>
            <button className="btn">Apply</button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
            ligula in lectus mattis congue. In vel odio eros. Ut consectetur
            aliquet odio, eu venenatis est posuere sed. Integer nec justo nec
            arcu commodo accumsan.
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
