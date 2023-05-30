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
        className="bg-white p-10 rounded-xl shadow-xl flex justify-between
    cursor-pointer items-center md:w-screen max-w-2xl"
      >
        <div>
          <h1 className="md:text-2xl text-xl text-blue-900 font-bold tracking-wide">{position}</h1>
          <p className="text-gray-500 truncate text-sm">{description}</p>
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
