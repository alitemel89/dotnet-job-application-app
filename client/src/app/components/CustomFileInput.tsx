import { ArrowUpOnSquareIcon } from '@heroicons/react/24/solid'
import React from 'react'

interface Props {
    resume: File | undefined;
    handleResumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function CustomFileInput({resume, handleResumeChange}: Props) {
  return (
    <div> <label
    htmlFor="resume"
    className="block mb-2 font-medium text-md text-gray-700"
  >
    RESUME*
  </label>
  <div className="flex items-center justify-center w-96 mb-4">
    <label
      htmlFor="resume"
      className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 
      border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 
      hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <ArrowUpOnSquareIcon className="text-gray-500 w-10 h-10 mb-4" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag
          and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
      </div>
      <input
        id="resume"
        type="file"
        className={`${resume ? "text-indigo-700 text-sm" : "hidden"}`}
        onChange={handleResumeChange}
      />
    </label>
  </div></div>
  )
}

export default CustomFileInput