import React from "react";
import { RiSearchLine } from "react-icons/ri";

function Search() {
  return (
    <section className="w-full flex flex-col items-center ">
      <form className="relative w-full lg:w-1/2 group">
        <div className="w-full relative z-10 ">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600" />
          <input
            type="text"
            placeholder="Buscar invitado"
            className="bg-white w-full py-2 pl-10 pr-4 rounded-lg text-black outline-none border-2 border-transparent focus:border-red-500"
          />
        </div>
      </form>
      <div className="flex flex-col gap-2 text-white">
        <h2>Invitados</h2>
        <div className="flex justify-start">
          <div>
            <p>Pablo</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
