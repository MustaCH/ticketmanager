import React from "react";
import { IoConstructSharp } from "react-icons/io5";

function Stats() {
  return (
    <div className="lg:ps-24 h-screen grid ">
      <div className="self-center flex flex-col gap-2 items-center">
        <p className="text-2xl font-bold text-white uppercase">
          Página en proceso
        </p>
        <IoConstructSharp className="text-5xl text-white" />
      </div>
    </div>
  );
}

export default Stats;
