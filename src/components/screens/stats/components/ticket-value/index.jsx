import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

function TicketValue() {
  return (
    <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-72 h-96">
      <div className="flex flex-col gap-16 px-6 pt-6">
        <h2 className="text-xl font-bold text-white text-center">
          Valor actual de entrada
        </h2>
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-white text-5xl font-semibold">$2000</p>
          <p className="text-red-500 text-2xl font-semibold">Preventa</p>
        </div>
      </div>

      <div className="group fixed bottom-0 w-full flex justify-center bg-neutral-500 hover:bg-neutral-900 duration-150 py-2 rounded-br-lg rounded-bl-lg">
        <button className="flex flex-col items-center font-bold text-gray-300 group-hover:text-red-500 duration-150">
          Modificar <AiOutlineEdit className="text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default TicketValue;
