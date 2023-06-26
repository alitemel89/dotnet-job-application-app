import React from "react";
import UploadLogoComponent from "../../components/UploadLogo";
import Navbar from "@/app/components/Navbar";
import { Application } from "@/app/types";
import Link from "next/link";

interface Props {
  params: { userId: string };
}

export const revalidate = 10;

async function CompanyProfile({ params: { userId } }: Props) {
  async function getApplications() {
    const res = await fetch(`http://localhost:5000/api/applications/${userId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch applications");
    }
    return res.json();
  }

  const applications = await getApplications();



  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-gray-100 h-screen">
        <UploadLogoComponent />
        {applications.length ? (
          <div className="flex justify-center p-8">
            <div className="overflow-x-auto">
              <h1 className="text-2xl font-bold my-4 text-center text-blue-900">
                Applications
              </h1>
              <table className="border border-gray-200 bg-white shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 font-semibold text-left">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 font-semibold text-left">
                      Email
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 font-semibold text-left">
                      Resume File Path
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 font-semibold text-left">
                      Job ID
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 font-semibold text-left">
                      Applied Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application: Application) => (
                    <tr key={application.id}>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {application.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {application.email}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <Link
                          href={`http://localhost:5000/api/applications/download?FileName=${encodeURIComponent(application.resumeFilePath)}`}
                          download={application.resumeFilePath?.split("/").pop() || ""}
                          className="text-indigo-500 hover:underline font-bold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {application.resumeFilePath}
                        </Link>

                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {application.jobId}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        {application.appliedDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold my-4 text-center">
              You have no Applications
            </h1>
          </>
        )}
      </div>
    </>
  );
}

export default CompanyProfile;
