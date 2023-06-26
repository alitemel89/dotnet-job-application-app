"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function PostJob() {
  const router = useRouter();
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePostJob = handleSubmit(async (data) => {
    const token = localStorage.getItem("jwtToken");
    console.log(token);
    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Job posted successfully
        toast.success("Job posted successfully");
        router.push("/");
        // Add any additional logic or redirect to another page
      } else {
        // Handle the error case
        toast.error("Error posting job");
      }
    } catch (error: any) {
      toast.error(error);
    }
  });

  return (
    <>
      <Navbar />
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
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 mb-2"
                {...register("position", { required: true })}
                onChange={(e) => setPosition(e.target.value)}
              />
              {errors.position && (
                <span className="text-red-500">Position is required</span>
              )}
              <label htmlFor="position" className="block font-medium mb-2">
                Location:
              </label>
              <input
                type="text"
                id="position"
                value={location}
                {...register("location", { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-3 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLocation(e.target.value)}
              />
              {errors.location && (
                <span className="text-red-500">Location is required</span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                {...register("description", { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && (
                <span className="text-red-500">Description is required</span>
              )}
            </div>
            <button type="submit" className="btn">
              Post Job
            </button>
            <Toaster position="top-right" />
          </form>
        </div>
      </div>
    </>
  );
}

export default PostJob;
