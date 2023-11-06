import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { TbTrashXFilled } from "react-icons/tb";
import { deleteGuest } from "../../../database/firebase";

function Search({ placeholder, data }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleBlur = () => {
    setSearchTerm("");
  };

  const handleDeleteGuest = (guestId) => {
    console.log("Guest ID to delete: ", guestId); // Comprueba que el ID sea correcto
    if (window.confirm("¿Estás seguro que deseas eliminar al invitado?")) {
      deleteGuest(guestId);
    }
  };

  const filteredData = data.filter((value) => {
    const fullName = `${value.name} ${value.lastName}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  return (
    <section className="w-full flex flex-col items-center pb-24">
      <h2 className="text-2xl text-white font-bold mb-8 mt-8 uppercase">
        Lista de invitados
      </h2>
      <form className="relative w-full lg:w-1/2 group">
        <div className="w-full relative z-10">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-red-600" />
          <input
            type="text"
            onChange={handleFilter}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="bg-white w-full py-2 pl-10 pr-4 rounded-tr-lg rounded-tl-lg text-black outline-none border-2 border-transparent focus:border-red-500"
          />
        </div>
        <ul className="flex flex-col rounded-bl-lg rounded-br-lg justify-start w-full z-50 bg-zinc-800 p-1 px-2 lg:p-5 shadow-2xl   overflow-auto">
          {filteredData.map((value, key) => (
            <div
              key={key}
              className="flex justify-between items-center px-6 py-4 gap-4 text-white p-1 lg:p-4 my-1 bg-zinc-900 border border-transparent rounded-lg hover:border-white  duration-150"
            >
              <div className="flex flex-col lg:flex-row  gap-2 lg:gap-4">
                <p className="text-red-500 capitalize ">
                  Nombre:{" "}
                  <span className="text-white">
                    {value.name} {value.lastName}
                  </span>
                </p>
                <p className="text-red-500 ">
                  Email: <span className="text-white">{value.email}</span>
                </p>
                <p className="text-red-500 ">
                  Entradas: <span className="text-white">{value.tickets}</span>
                </p>
                <p className="text-red-500 ">
                  Valor: <span className="text-white">Preventa</span>
                </p>
              </div>
              <div>
                <TbTrashXFilled
                  onClick={() => handleDeleteGuest(value.id)}
                  className="text-white text-lg hover:text-red-500 hover:scale-110 duration-150 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </ul>
      </form>
    </section>
  );
}

export default Search;
