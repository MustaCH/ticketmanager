import React, { useState } from "react";
import { Input, Button } from "../index";
import { handleStoreVip } from "../../../database/firebase";

function VipForm({ date }) {
  const [name, setName] = useState("XXXXX");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("XXXXX");
  const [tickets, setTickets] = useState("XX");

  const handleGuestName = (e) => {
    let value = e.target.value;
    setName(value);
  };

  const handleGuestLastname = (e) => {
    let value = e.target.value;
    setLastName(value);
  };

  const handleGuestDni = (e) => {
    let value = e.target.value;
    setDni(value);
  };

  const handleGuestTickets = (e) => {
    let value = e.target.value;
    setTickets(value);
  };

  const handleCreateInvite = () => {
    handleStoreVip({
      name,
      lastName,
      dni,
      tickets,
      date,
    });
  };

  return (
    <section>
      <div className="text-white bg-neutral-800 py-4 lg:p-8 rounded-lg flex flex-col lg:flex-row-reverse justify-center w-full gap-8 lg:gap-24 drop-shadow-xl">
        <div className="flex flex-col items-start gap-4 ps-8 lg:ps-0">
          <h2 className="text-2xl font-bold uppercase mb-8">Invitados vip</h2>
          <Input
            label={"Nombre"}
            labelFor={"firstname"}
            name={"firstname"}
            type={"text"}
            onChange={handleGuestName}
            customStyle={"w-80"}
          />
          <Input
            label={"Apellido"}
            labelFor={"lastname"}
            name={"lastname"}
            type={"text"}
            onChange={handleGuestLastname}
            customStyle={"w-80"}
          />
          <Input
            label={"DNI"}
            labelFor={"dni"}
            name={"dni"}
            type={"text"}
            onChange={handleGuestDni}
            customStyle={"w-80"}
          />
          <Input
            label={"Entradas"}
            labelFor={"tickets"}
            name={"tickets"}
            type={"number"}
            onChange={handleGuestTickets}
          />
          <div className="mt-8">
            <Button name={"Añadir invitado"} onClick={handleCreateInvite} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VipForm;
