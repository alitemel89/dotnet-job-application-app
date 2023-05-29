import React from "react";

interface Props {
  params: { companyName: string; jobId: string };
}

function JobDetailsPage({ params: { companyName, jobId } }: Props) {
  // fetch data from server with parameter jobId and companyName
  return (
    <div>
      <h1>Job Details</h1>
      <h2>{companyName}</h2>
      <p>{jobId}</p>
    </div>
  );
}

export default JobDetailsPage;
