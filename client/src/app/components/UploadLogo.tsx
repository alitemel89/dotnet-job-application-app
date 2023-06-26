"use client";

import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toaster, toast } from "react-hot-toast";
import { storage } from "../../../firebase";
import Link from "next/link";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

function UploadLogoComponent() {
  const [logoUpload, setLogoUpload] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>("");
  const router = useRouter();

  const user = JSON.parse(localStorage.getItem("user")!);

  const handleLogout = () => {
    // Clear user and JWT token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");

    // Redirect to the login page or any other desired route
    router.push("/signin");
  };

  const uploadLogo = async () => {
    if (logoUpload == null) return;
    const logoRef = ref(storage, `logos/${logoUpload.name + "-" + user.email}`);
    console.log(logoRef.fullPath);
    try {
      const snapshot = await uploadBytes(logoRef, logoUpload);
      const url = await getDownloadURL(snapshot.ref);
      setLogoUrl(url);
      toast.success("Logo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Error uploading logo");
    }
  };

  return (
    <div className="flex justify-center p-8">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3">
        <div className="flex items-center justify-between space-x-4">
          <h1 className="text-2xl font-bold mb-4 text-blue-900">
            Company Profile
          </h1>
          <Link
            className="btn-secondary text-blue-900 border-indigo-500 
          flex items-center hover:bg-indigo-500 hover:text-white"
            href={"/signin"}
            onClick={handleLogout}
          >
            Log out{" "}
            <ArrowRightOnRectangleIcon className="w-4 h-4 ml-2 font-bold" />
          </Link>
        </div>
        <div className="flex justify-around mt-8 items-center border border-gray-300">
          <input
            type="file"
            onChange={(event) => {
              setLogoUpload(event.target.files?.[0] || null);
            }}
          />
          <button onClick={uploadLogo} className="btn my-2">
            Upload Logo
          </button>
        </div>

        <Toaster position="top-right" />
        {logoUrl && (
          <div>
            <h2 className="text-lg font-bold my-4">Uploaded Logo:</h2>
            <img src={logoUrl} alt="uploaded logo" />
            <Link className="btn mt-4" href="/">
              Done
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadLogoComponent;
