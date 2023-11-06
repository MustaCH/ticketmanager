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
    <section className="lg:col-span-2 row-span-2 bg-neutral-900/30 backdrop-blur-xl rounded-lg h-full w-96 lg:w-full z-10">
      <div className="px-6 pt-6 mb-24 lg:mb-0">
        <h2 className="text-xl lg:text-2xl mb-8 lg:mb-12 font-bold text-white text-center">
          Evento actual
        </h2>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Fecha:{" "}
            <AiOutlineEdit className="text-gray-400 text-lg lg:text-2xl cursor-pointer" />
          </p>
          <span className="flex items-center justify-between font-normal text-base">
            24/11/2023
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Locación:{" "}
            <AiOutlineEdit className="text-gray-400 text-lg lg:text-2xl cursor-pointer" />
          </p>

          <span className="flex items-center justify-between font-normal text-base">
            Niceto Vega 5198 - Miloca
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Link de pago:{" "}
            <AiOutlineEdit className="text-gray-400 text-lg lg:text-2xl cursor-pointer" />
          </p>
          <span className="flex items-center justify-between font-normal text-base truncate ">
            https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Inversión:{" "}
            <AiOutlineEdit className="text-gray-400 text-lg lg:text-2xl cursor-pointer" />
          </p>
          <span className="flex items-center justify-between font-normal text-base truncate ">
            $120000
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Valor de entrada: <span className="text-red-500">Preventa</span>{" "}
            <AiOutlineEdit className="text-gray-400 text-lg lg:text-2xl cursor-pointer" />
          </p>
          <span className="flex items-center justify-between font-normal text-base truncate ">
            $2000
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          <p className="flex justify-between items-center">
            Valor de entrada: <span className="text-green-500">General</span>{" "}
            <AiOutlineEdit className="text-gray-400 text-lg lg:text-2xl cursor-pointer" />
          </p>
          <span className="flex items-center justify-between font-normal text-base truncate ">
            $2500
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
