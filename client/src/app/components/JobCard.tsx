import Link from "next/link";
import {  BuildingOffice2Icon } from "@heroicons/react/24/solid";

type Props = {
  jobId?: string;
  position: string;
  description: string;
  companyName: string;
};

function JobCard({ position, description, companyName, jobId }: Props) {
  return (
    <Link href={`/companies/${companyName}/${jobId}`}>
      <div
        className="bg-white px-10 py-8 rounded-xl shadow-xl shadow-indigo-800/30 flex justify-between
    cursor-pointer items-center md:w-screen max-w-3xl"
      >
        <div>
          <h1 className="md:text-2xl text-xl text-blue-900 font-bold tracking-wide md:max-w-md mb-2">{position}</h1>
          <p className="text-gray-500 text-sm md:max-w-md md:line-clamp-2 line-clamp-1">{description}</p>
        </div>
        <div className="flex items-center ml-4">
          <BuildingOffice2Icon className="h-8 w-8 text-emerald-500 mx-4" />
          <h3 className="md:text-md text-sm text-emerald-600 font-semibold">
            {companyName}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
