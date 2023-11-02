import React from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineCloseCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteAllGuests, deleteEvent } from "../../../database/firebase";

function Stats() {
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
    <div className="lg:ps-24 min-h-screen flex flex-col gap-12">
      <h1 className="text-3xl font-bold text-white uppercase text-center mt-12">
        Seteo y Estadisticas
      </h1>
      <div className="grid pb-24 mt-12 place-items-center">
        <div className="self-center align-center grid grid-cols-1 lg:grid-cols-4 place-items-center gap-2 items-center">
          <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-72 h-96">
            <div className="px-6 pt-6">
              <h2 className="text-xl font-bold text-white text-center">
                Administradores
              </h2>
              <ul className="flex flex-col gap-2 my-4 text-white text-lg">
                <li className="grid grid-cols-2 items-center gap-8">
                  Masto
                  <span className="flex justify-end">
                    <AiOutlineEdit className="text-gray-400 cursor-pointer" />
                  </span>
                </li>
                <li className="grid grid-cols-2  items-center gap-8">
                  Rivas
                  <span className="flex justify-end">
                    <AiOutlineEdit className="text-gray-400 cursor-pointer" />
                  </span>
                </li>
                <li className="grid grid-cols-2  items-center gap-8">
                  Emi
                  <span className="flex justify-end">
                    <AiOutlineEdit className="text-gray-400 cursor-pointer" />
                  </span>
                </li>
              </ul>
            </div>
            <div className="group fixed bottom-0 w-full flex justify-center bg-neutral-500 hover:bg-neutral-900 duration-150 py-2 rounded-br-lg rounded-bl-lg">
              <button className="flex flex-col items-center font-bold text-gray-300 group-hover:text-red-500 duration-150">
                Añadir nuevo <AiOutlinePlusCircle className="text-2xl" />
              </button>
            </div>
          </section>
          <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-72 h-96">
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
            <div className="group fixed bottom-0 w-full flex justify-center bg-red-800 hover:bg-neutral-900 duration-150 py-2 rounded-br-lg rounded-bl-lg">
              <button
                onClick={handleEventDeletion}
                className="flex flex-col items-center font-bold text-gray-300 group-hover:text-red-500 duration-150"
              >
                Finalizar evento <AiOutlineCloseCircle className="text-2xl" />
              </button>
            </div>
          </section>
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
        </div>
      </div>
    </div>
  );
}

export default Stats;
