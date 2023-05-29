type Props = {
  jobId?: string;
  position: string;
  description: string;
  companyName: string;
};

function JobCard({ position, description, companyName }: Props) {
  return (
    <div className="bg-white p-10 rounded-xl shadow-xl w-3/5">
      <h1 className="text-3xl text-blue-900">{position}</h1>
      <h3 className="text-md text-cyan-600 font-semibold">{companyName}</h3>
      <p className="text-gray-500 truncate text-sm">{description}</p>
    </div>
  );
}

export default JobCard;
