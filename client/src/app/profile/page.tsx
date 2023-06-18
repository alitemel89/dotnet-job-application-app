"use client";

import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Toaster, toast } from "react-hot-toast";
import { storage } from "../../../firebase";
import { useStore } from "../store";

function CompanyProfile() {
  const [logoUpload, setLogoUpload] = useState<File | null>(null);
  const logoUrl = useStore((state) => state.companyLogoUrl);
  const setLogoUrl = useStore((state) => state.setCompanyLogo);

  const uploadLogo = async () => {
    if (logoUpload == null) return;
    const logoRef = ref(storage, `logos/${logoUpload.name + v4()}`);
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
