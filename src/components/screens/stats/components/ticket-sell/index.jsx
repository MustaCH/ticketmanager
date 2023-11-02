import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";

function TicketSell() {
  return (
    <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-72 h-96">
      <div className="flex flex-col gap-16 px-6 pt-6">
        <h2 className="text-xl font-bold text-white text-center">
          Entradas vendidas
        </h2>
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-white text-5xl font-semibold">150</p>
          <p className="text-white/80 text-2xl font-semibold">$350000</p>
        </div>
      </div>
      <div className="group fixed bottom-0 w-full flex justify-center bg-neutral-500 hover:bg-neutral-900 duration-150 py-2 rounded-br-lg rounded-bl-lg">
        <Link
          to={"/guestList"}
          className="flex flex-col items-center font-bold text-gray-300 group-hover:text-red-500 duration-150"
        >
          Revisar lista <AiOutlineUnorderedList className="text-2xl" />
        </Link>
      </div>
    </section>
  );
}

export default TicketSell;
