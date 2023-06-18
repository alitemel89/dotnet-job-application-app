"use client";

import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

function PostJob() {
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  const handlePostJob = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("jwtToken");
    console.log(token)
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ position, description }),
      });

      if (response.ok) {
        // Job posted successfully
        toast.success("Job posted successfully");
        // Add any additional logic or redirect to another page
      } else {
        // Handle the error case
        toast.error("Error posting job");
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-200 to-indigo-400">
      <div className="bg-white p-8 rounded shadow-md md:w-3/5 w-full">
        <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
        <form onSubmit={handlePostJob}>
          <div className="mb-4">
            <label htmlFor="position" className="block font-medium mb-2">
              Position:
            </label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={8}
            ></textarea>
          </div>
          <button type="submit" className="btn">
            Post Job
          </button>
          <Toaster position="top-right" />
        </form>
      </div>
    </div>
  );
}

export default PostJob;
