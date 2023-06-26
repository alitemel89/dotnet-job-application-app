"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import HeroSection from "@/app/components/HeroSection";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import { Job } from "@/app/types";

interface Props {
  params: { jobId: string };
}

export default function Apply({ params: { jobId } }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [job, setJob] = useState<Job | undefined>();

  useEffect(() => {
    async function getJob() {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        if (res.ok) {
          const job: Job = await res.json();
          setJob(job!);
        } else {
          console.error("Error:", res.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getJob();
  }, []);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResume(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const date = new Date();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("jobId", jobId);
    formData.append("appliedDate", date.toISOString());

    if (resume) {
      formData.append("resumeFilePath", resume);
    }

    if (!name || !email || !resume) {
      toast.error("Please provide your name, email, and resume");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Job application submitted successfully
        toast.success("Job application submitted successfully");
        setIsSubmitted(true);
        router.push(`/apply/${jobId}/success`);
      } else {
        // Handle the error case
        toast.error("Error submitting job application");
      }
    } catch (error: any) {
      toast.error(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      {job && <HeroSection job={job} companyName={job?.user?.companyName!} />}
      <h1 className="text-emerald-400 md:text-2xl text-xl my-4 text-center">
        WE ARE LOOKING FORWARD TO HEARING FROM YOU!
      </h1>
      <div className="md:w-3/5 w-full p-10 bg-white h-[60vh] mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="md:flex md:space-x-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 font-medium text-md text-gray-700"
              >
                NAME*
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-96 border border-gray-300 bg-gray-100 rounded-md py-2 px-3 
  focus:outline-none focus:bg-white"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-md text-gray-700"
              >
                EMAIL*
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-96 border border-gray-300 bg-gray-100 rounded-md py-2 px-3 
  focus:outline-none focus:bg-white"
                required
              />
            </div>
          </div>

          <label
            htmlFor="resume"
            className="block mb-2 font-medium text-md text-gray-700"
          >
            RESUME*
          </label>
          <div className="flex items-center justify-center w-96 mb-4">
            <label
              htmlFor="resume"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 
      border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 
      hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ArrowUpOnSquareIcon className="text-gray-500 w-10 h-10 mb-4" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
              </div>
              <input
                id="resume"
                type="file"
                className={`${resume ? "text-indigo-700 text-sm" : "hidden"}`}
                onChange={handleResumeChange}
              />
            </label>
          </div>
          <button type="submit" className="btn text-md" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Apply"}
          </button>
          <Toaster />
        </form>
      </div>
    </>
  );
}
