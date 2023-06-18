"use client";

import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toaster, toast } from "react-hot-toast";
import { storage } from "../../../firebase";

function CompanyProfile() {
  const [logoUpload, setLogoUpload] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>("");


  const user = JSON.parse(localStorage.getItem("user")!);

  const uploadLogo = async () => {
    if (logoUpload == null) return;
    const logoRef = ref(storage, `logos/${logoUpload.name + "-" + user.email}`);
    console.log(logoRef.fullPath)
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3">
        <h1 className="text-2xl font-bold mb-4">Company Profile</h1>
        <input
          type="file"
          onChange={(event) => {
            setLogoUpload(event.target.files?.[0] || null);
          }}
        />
        <button onClick={uploadLogo} className="btn">
          Upload Logo
        </button>
        <Toaster position="top-right" />
        {logoUrl && (
          <div>
            <h2 className="text-lg font-bold my-4">Uploaded Logo:</h2>
            <img src={logoUrl} alt="uploaded logo" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyProfile;
