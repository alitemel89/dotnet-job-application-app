import React from "react";
import UploadLogoComponent from "../components/UploadLogo";


async function CompanyProfile() {

//   async function getApplications() {
//     const res = await fetch("http://localhost:5000/api/applications", {
//       next: { revalidate: 10 },
//     }); // The result is cached
//     return res.json();
//   }

//   const applications = await getApplications();

//   console.log(applications)
  return (
    <>
      <UploadLogoComponent />
    </>
  );
}

export default CompanyProfile;
