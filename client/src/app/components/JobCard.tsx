import Link from "next/link";
import { BuildingOffice2Icon, MapPinIcon } from "@heroicons/react/24/solid";

type Props = {
  jobId?: string;
  position: string;
  description: string;
  companyName: string;
  location: string;
};

function JobCard({
  position,
  description,
  companyName,
  jobId,
  location,
}: Props) {
  return (
    <Link href={`/companies/${companyName}/${jobId}`}>
      <div
        className="bg-white px-10 py-8 rounded-xl shadow-xl shadow-indigo-800/30 flex justify-between
    cursor-pointer items-center md:w-screen max-w-3xl"
      >
        <div>
          <h1 className="md:text-2xl text-xl text-blue-900 font-bold tracking-wide md:max-w-md mb-4">
            {position}
          </h1>
          <p className="text-gray-500 text-sm md:max-w-md md:line-clamp-2 line-clamp-1">
            {description}
          </p>
          <div className="flex items-center mt-4">
            <MapPinIcon className="w-8 h-8 text-emerald-400" />
            <p className="text-sm text-emerald-400 md:text-md font-medium">
              {location}
            </p>
          </div>
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
