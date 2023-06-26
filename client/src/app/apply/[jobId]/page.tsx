"use client";

import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import HeroSection from "@/app/components/HeroSection";
import CustomFileInput from "@/app/components/CustomFileInput";
import CustomNameInput from "@/app/components/CustomNameInput";
import CustomEmailInput from "@/app/components/CustomEmailInput";

interface Props {
  params: { jobId: string };
}

interface Job {
  jobId: string;
  position: string;
  description: string;
  location: string;
  user: {
    id: string;
    email: string;
    companyName: string;
  };
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
              <CustomNameInput name={name} setName={setName} />
            </div>
            <div className="mb-4">
              <CustomEmailInput email={email} setEmail={setEmail} />
            </div>
          </div>

          <CustomFileInput
            resume={resume}
            handleResumeChange={handleResumeChange}
          />

          <button type="submit" className="btn text-md" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Apply"}
          </button>
          <Toaster />
        </form>
      </div>
    </>
  );
}
