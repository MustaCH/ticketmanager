import React from "react";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { deleteAllGuests, deleteEvent } from "../../../../../database/firebase";

function CurrentEvent() {
  const handleEventDeletion = () => {
    const confirmFirstAlert = window.confirm(
      "¿Estás seguro de que deseas finalizar el evento?"
    );
    if (confirmFirstAlert) {
      const confirmSecondAlert = window.confirm(
        "¡Esta acción no se puede deshacer! ¿Estás absolutamente seguro?"
      );
      if (confirmSecondAlert) {
        deleteEvent();
        deleteAllGuests();
      }
    }
  };

  return (
    <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-72 h-96 z-10">
      <div className="px-6 pt-6 h-96">
        <h2 className="text-xl font-bold text-white text-center">
          Evento actual
        </h2>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Fecha:{" "}
            <AiOutlineEdit className="text-gray-400 text-lg cursor-pointer" />
          </p>
          <span className="flex items-center justify-between font-normal text-base">
            24/11/2023
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Locación:{" "}
            <AiOutlineEdit className="text-gray-400 text-lg cursor-pointer" />
          </p>

          <span className="flex items-center justify-between font-normal text-base">
            Niceto Vega 5198 - Miloca
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Link de pago:{" "}
            <AiOutlineEdit className="text-gray-400 text-lg cursor-pointer" />
          </p>
          <span className="flex items-center justify-between font-normal text-base truncate ">
            https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js
          </span>
        </div>
      </div>
      <div
        onClick={handleEventDeletion}
        className="group fixed bottom-0 w-full flex justify-center bg-red-800 hover:bg-neutral-900 duration-150 py-2 rounded-br-lg rounded-bl-lg cursor-pointer"
      >
        <button className="flex flex-col items-center font-bold text-gray-300 group-hover:text-red-500 duration-150">
          Finalizar evento <AiOutlineCloseCircle className="text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default CurrentEvent;
