export interface Job {
  jobId: string;
  position: string;
  description: string;
  location: string;
  user: {
    id: string;
    email: string;
    companyName: string;
  };
}

export interface Application {
  id: string;
  name: string;
  email: string;
  resumeFilePath: string;
  appliedDate: string;
  jobId: string;
}
