"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { Toaster, toast } from "react-hot-toast";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const response = await fetch("http://localhost:5000/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        toast.success("Login successful!")
        localStorage.setItem("jwtToken", data.token);
        const user = {
          email,
          hashedPassword,
        };
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } else {
        const errorData = await response.json();
        console.log("Login failed:", errorData);
        toast.error("Invalid Credentials.")
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error("Invalid Credentials.")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-400 to-indigo-800">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center mb-8">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4"></div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <Toaster position="top-right" />
        </form>
      </div>

    </div>
  );
}

export default Signin;
