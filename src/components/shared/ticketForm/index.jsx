import React, { useRef, useState } from "react";
import { Input, Button, Ticket } from "../index";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { handleStoreGuest } from "../../../database/firebase";

function TicketForm({ date }) {
  const [name, setName] = useState("XXXXX");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("XXXXX");
  const [email, setEmail] = useState("XXXXX");
  const [tickets, setTickets] = useState("XX");
  const ticketRef = useRef();

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

  const handleGuestEmail = (e) => {
    let value = e.target.value;
    setEmail(value);
  };

  const handleGuestTickets = (e) => {
    let value = e.target.value;
    setTickets(value);
  };

  const handleCreateInvite = () => {
    handleStoreGuest({ name, lastName, dni, email, tickets, date });

    for (let i = 0; i < tickets; i++) {
      // Generar una imagen para el ticket actual
      htmlToImage
        .toPng(ticketRef.current)
        .then((dataUrl) => {
          // Descargar la imagen con un nombre único
          download(dataUrl, `ticket${name}${lastName}_${i + 1}.png`);
        })
        .catch((error) => {
          console.error("Error al generar la imagen:", error);
        });
    }
  };

  return (
    <section className="text-gray-300 flex flex-col lg:flex-row-reverse justify-center w-full gap-8 lg:gap-24">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl text-center font-bold">Añadir invitado</h2>
        <Input
          label={"Nombre"}
          labelFor={"firstname"}
          name={"firstname"}
          type={"text"}
          onChange={handleGuestName}
        />
        <Input
          label={"Apellido"}
          labelFor={"lastname"}
          name={"lastname"}
          type={"text"}
          onChange={handleGuestLastname}
        />
        <Input
          label={"DNI"}
          labelFor={"dni"}
          name={"dni"}
          type={"text"}
          onChange={handleGuestDni}
        />
        <Input
          label={"Email"}
          labelFor={"email"}
          name={"email"}
          type={"text"}
          onChange={handleGuestEmail}
        />
        <Input
          label={"Entradas"}
          labelFor={"tickets"}
          name={"tickets"}
          type={"number"}
          onChange={handleGuestTickets}
        />
        <div>
          <Button name={"Generar ticket"} onClick={handleCreateInvite} />
        </div>
      </div>
      <div ref={ticketRef}>
        <Ticket
          name={name}
          lastName={lastName}
          dni={dni}
          tickets={tickets}
          date={date}
        />
      </div>
    </section>
  );
}

export default TicketForm;
