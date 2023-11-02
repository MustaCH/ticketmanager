import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineEdit } from "react-icons/ai";
import { getAdminsData } from "../../../../../database/firebase";

function Admins({ editAdmin, newAdmin }) {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    getAdminsData().then((adminsData) => {
      setAdmins(adminsData);
    });
  }, []);
  return (
    <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-72 h-96">
      <div className="px-6 pt-6">
        <h2 className="text-xl font-bold text-white text-center">
          Administradores
        </h2>
        <ul className="flex flex-col gap-2 my-4 text-white text-lg">
          {admins.map((admin) => (
            <li
              className="grid grid-cols-2 items-center gap-8 truncate"
              key={admin.id}
            >
              {admin.name}
              <span className="flex justify-end">
                <AiOutlineEdit
                  className="text-gray-400 cursor-pointer"
                  onClick={editAdmin}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={newAdmin}
        className="group fixed bottom-0 w-full flex justify-center bg-neutral-500 hover:bg-neutral-900 duration-150 py-2 rounded-br-lg rounded-bl-lg cursor-pointer"
      >
        <button className="flex flex-col items-center font-bold text-gray-300 group-hover:text-red-500 duration-150">
          Añadir nuevo <AiOutlinePlusCircle className="text-2xl" />
        </button>
      </div>
    </section>
  );
}

export default Admins;
