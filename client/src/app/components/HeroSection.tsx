"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../../firebase";
import { MapPinIcon } from "@heroicons/react/24/solid";


interface Job {
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

interface Props {
  companyName: string;
  job: Job;
}

function HeroSection({ job, companyName }: Props) {
  const [companyLogoUrl, setCompanyLogoUrl] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imagesListRef = ref(storage, "logos/");

  useEffect(() => {
    listAll(imagesListRef)
      .then(async (res) => {
        const { items } = res;
        const urls = await Promise.all(
          items.map((item) => getDownloadURL(item))
        );
        setImageUrls(urls);
      })
      .catch((error) => {
        console.log(error);
      });

    imageUrls.map((url) => {
      decodeURIComponent(url).match(/\w+@\w+\.\w+/g)![0] === job?.user?.email!
        ? setCompanyLogoUrl(url)
        : null;
    });
  }, [job, imageUrls]);

  return (
    <div className="flex justify-center">
      <div className="relative top-0 h-[55vh] w-full filter brightness-50 opacity-80">
        <Image
          src="/images/hero.jpg"
          alt="hero-image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="text-white absolute top-10 p-10">
        <h1 className="md:text-5xl font-bold mb-4 text-3xl">{job.position}</h1>
        <div className="flex items-center rounded-full">
          {companyLogoUrl ? (
            <Image
              src={companyLogoUrl!}
              alt="Company Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
          ) : (
            <div className="bg-gray-400 w-16 h-16 rounded-full"></div>
          )}

          <p className="md:text-lg text-md ml-4 text-center">{decodeURI(companyName)}</p>
          <MapPinIcon className="w-6 h-6 ml-4" />
          <p className="text-white p-1 font-light">{job?.location}</p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
