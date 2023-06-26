import React from "react";

interface Props {
    name: string;
    setName: (name: string) => void;
}

function CustomNameInput({name, setName}: Props) {
  return (
    <div>
      {" "}
      <label
        htmlFor="name"
        className="block mb-2 font-medium text-md text-gray-700"
      >
        NAME*
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-96 border border-gray-300 bg-gray-100 rounded-md py-2 px-3 
  focus:outline-none focus:bg-white"
        required
      />
    </div>
  );
}

export default CustomNameInput;
