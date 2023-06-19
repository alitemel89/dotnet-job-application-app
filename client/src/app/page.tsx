import Image from "next/image";
import JobCard from "./components/JobCard";
import Navbar from "./components/Navbar";

type JobProps = {
  jobId: string;
  position: string;
  description: string;
  location: string;
  user: {
    id: string;
    email: string;
    passwordHash: string;
    companyName: string;
  };
};

export default async function Home() {
  async function getJobs() {
    const res = await fetch("http://localhost:5000/api/jobs", {
      next: { revalidate: 10 },
    }); // The result is cached
    return res.json();
  }

  const jobs = await getJobs();

  return (
    <>
      <Navbar />
      <div className="relative h-[50vh] w-full">
        <Image
          src="/images/hero.jpg"
          alt="hero-image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <main className="flex flex-col space-y-4 items-center justify-between bg-slate-100 p-8">
        {jobs.map((job: JobProps) => (
          <JobCard
            companyName={job.user.companyName}
            description={job.description}
            position={job.position}
            jobId={job.jobId}
            location={job.location}
          />
        ))}
      </main>
    </>
  );
}
