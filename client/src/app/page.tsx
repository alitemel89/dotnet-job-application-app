import JobCard from "./components/JobCard";

type JobProps = {
  jobId: string;
  position: string;
  description: string;
  user: {
    id: string;
    email: string;
    passwordHash: string;
    companyName: string;
  };
};

export default async function Home() {
  async function getJobs() {
    const res = await fetch("http://localhost:5000/api/jobs"); // The result is cached
    return res.json();
  }

  const jobs = await getJobs();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-300">
      {jobs.map((job: JobProps) => (
        <JobCard
          companyName={job.user.companyName}
          description={job.description}
          position={job.position}
          jobId={job.jobId}
        />
      ))}
    </main>
  );
}
