"use client"

import { ShareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

function ShareButton() {
  return (
    <div>
      {" "}
      <Link
        className="btn-secondary text-emerald-400 flex items-center space-x-2"
        href={"/share"}
      >
        <p>Share</p>
        <ShareIcon className="w-4 h-4 text-emerald-400" />
      </Link>
    </div>
  );
}

export default ShareButton;
