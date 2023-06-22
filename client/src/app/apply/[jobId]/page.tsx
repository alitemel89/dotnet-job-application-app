"use client"

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface Props {
  params: { jobId: string };
}

export default function Apply({ params: { jobId } }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const date = new Date();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("jobId", jobId);
    formData.append("appliedDate", date.toISOString())
    if (resume) {
      formData.append("resume", resume);
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-100 to-indigo-100">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">Apply to Job</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block mb-2">
            Resume
          </label>
          <input
            type="file"
            id="resume"
            onChange={(e) => setResume(e.target.files?.[0])}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        <Toaster />
      </form>
    </div>
  );
}
