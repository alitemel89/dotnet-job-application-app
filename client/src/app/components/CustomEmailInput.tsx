import React from "react";

interface Props {
  email: string;
  setEmail: (name: string) => void;
}

function CustomEmailInput({ email, setEmail }: Props) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 font-medium text-md text-gray-700"
      >
        EMAIL*
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-96 border border-gray-300 bg-gray-100 rounded-md py-2 px-3 
  focus:outline-none focus:bg-white"
        required
      />
    </div>
  );
}

export default CustomEmailInput;
