import React from "react";
import {
  ArrowLeftCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface Props {
  params: { jobId: string };
}

const SuccessPage = async ({ params: { jobId } }: Props) => {
  async function getJob() {
    const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`) // The result is cached
    return res.json();
  }

  const job = await getJob();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white-100">
      <div className="text-green-700 mb-8">
        <CheckCircleIcon className="w-24 h-24" />
      </div>
      <h1 className="text-4xl font-extrabold mb-4 text-emerald-700">Your application is sent!</h1>
      <p className="text-xl text-emerald-700 mb-4">Thank you for applying.</p>
      <h1 className="text-xl text-emerald-700 mb-4">{`You have succesfully applied to ${job.position}`}</h1>
      <Link href="/">
        <div className="flex items-center space-x-1 mt-8 text-indigo-800">
          <ArrowLeftCircleIcon className="w-8 h-8 cursor-pointer " />
          <p>Back to Jobs</p>
        </div>
      </Link>
    </div>
  );
};

export default SuccessPage;
