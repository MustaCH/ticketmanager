import React, { useState } from "react";
import { Admins, CurrentEvent, TicketSell } from "./components/index";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Button, Input } from "../../shared";

function Stats() {
  const [editAdmin, setEditAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState(false);

  return (
    <div className="lg:ps-24 min-h-screen flex flex-col gap-12">
      <h1 className="text-3xl font-bold text-white uppercase text-center mt-12">
        Seteo y Estadisticas
      </h1>
      <div className="grid pb-24 place-items-center">
        <div className="self-center align-center grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 place-items-center gap-2 items-center">
          <CurrentEvent />
          <Admins
            editAdmin={() => setEditAdmin(true)}
            newAdmin={() => setNewAdmin(true)}
          />
          <TicketSell />
        </div>
        <dialog
          open={editAdmin}
          className="absolute z-50 rounded-lg pb-8 pt-4 bg-neutral-900 text-white drop-shadow-2xl"
        >
          <div className="flex justify-between items-center mb-4 px-4">
            <h2 className="text-xl font-semibold">Editar usuario:</h2>
            <AiOutlineCloseCircle
              className="text-2xl cursor-pointer"
              onClick={() => setEditAdmin(false)}
            />
          </div>
          <div className="flex flex-col gap-4 px-8">
            <Input label="Nombre:" />
            <Input label="Usuario:" />
            <div className="flex gap-4 flex-row-reverse justify-center">
              <Button name="Eliminar" customStyle={"bg-transparent"} />
              <Button name="Guardar" />
            </div>
          </div>
        </dialog>
        <dialog
          open={newAdmin}
          className="absolute z-50 rounded-lg pb-8 pt-4 bg-neutral-900 text-white"
        >
          <div className="flex justify-between items-center mb-4 px-4">
            <h2 className="text-xl font-semibold">Crear usuario</h2>
            <AiOutlineCloseCircle
              className="text-2xl cursor-pointer"
              onClick={() => setNewAdmin(false)}
            />
          </div>
          <div className="flex flex-col gap-4 px-8">
            <Input label="Nombre:" />
            <Input label="Usuario:" />
            <Input label="Constraseña:" />
            <div className="flex gap-4 flex-row-reverse justify-center">
              <Button name="Cancelar" customStyle={"bg-transparent"} />
              <Button name="Guardar" />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Stats;
