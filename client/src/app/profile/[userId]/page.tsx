import React from "react";
import UploadLogoComponent from "../../components/UploadLogo";

interface Props {
  params: { userId: string };
}

interface Application {
  id: string,
  name: string,
  email: string
}


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
      <UploadLogoComponent />
      {applications.map((application: Application) => (
        <div key={application.id}>
          <p>Name: {application.name}</p>
          <p>Email: {application.email}</p>
        </div>
      ))}
    </>
  );
}

export default CompanyProfile;
