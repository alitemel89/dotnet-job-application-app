import Image from "next/image";
import JobCard from "./components/JobCard";
import Navbar from "./components/Navbar";
import { CodeBracketSquareIcon, MapPinIcon } from "@heroicons/react/24/solid";

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
      <div className="flex justify-center">
        <div className="relative h-[60vh] w-full">
          <Image
            src="/images/hero.jpg"
            alt="hero-image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="text-white absolute md:top-1/4 top-2/4 text-center">
          <h1 className="md:text-5xl font-bold my-4 text-3xl">
            Find Latest Tech Jobs!
          </h1>
          <div className="flex items-center justify-center">
            <CodeBracketSquareIcon className="w-6 h-6 ml-4" />
            <p className="text-white p-1 font-light text-center">
              REMOTE TECH JOBS
            </p>
          </div>
        </div>
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
