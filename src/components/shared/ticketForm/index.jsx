import React, { useEffect, useRef, useState } from "react";
import { Input, Button, Ticket } from "../index";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { getEvent, handleStoreGuest } from "../../../database/firebase";

function TicketForm({ date, location }) {
  const [existingEvent, setExistingEvent] = useState();
  const [name, setName] = useState("XXXXX");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("XXXXX");
  const [email, setEmail] = useState("XXXXX");
  const [tickets, setTickets] = useState("XX");
  const [twone, setTwone] = useState(false);
  const ticketType = existingEvent?.currentTicket;
  const ticketValue = existingEvent?.ticket;
  const ticketRef = useRef();

  useEffect(() => {
    const currentEvent = async () => {
      try {
        const event = await getEvent();
        if (event) {
          setExistingEvent(event);
        }
      } catch (error) {
        console.error("Error al verificar el evento existente: ", error);
      }
    };

    currentEvent();
  }, []);

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

  const handleTwone = (e) => {
    setTwone(true);
  };

  const handleCreateInvite = () => {
    handleStoreGuest({
      name,
      lastName,
      dni,
      email,
      tickets,
      date,
      twone,
      ticketValue,
      ticketType,
    });

    for (let i = 0; i < tickets; i++) {
      htmlToImage
        .toPng(ticketRef.current)
        .then((dataUrl) => {
          download(dataUrl, `ticket${name}${lastName}_${i + 1}.png`);
        })
        .catch((error) => {
          console.error("Error al generar la imagen:", error);
        });
    }
  };

  return (
    <section>
      <div className="text-gray-300 flex flex-col lg:flex-row-reverse justify-center w-full gap-8 lg:gap-24">
        <div className="flex flex-col items-start gap-4 ps-8 lg:ps-0">
          <h2 className="text-2xl font-bold uppercase mb-8">
            Generar entradas
          </h2>
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
            label={"Email"}
            labelFor={"email"}
            name={"email"}
            type={"text"}
            onChange={handleGuestEmail}
            customStyle={"w-80"}
          />
          <Input
            label={"Entradas"}
            labelFor={"tickets"}
            name={"tickets"}
            type={"number"}
            onChange={handleGuestTickets}
          />
          {tickets > 1 ? (
            <div className="flex items-center gap-4 text-xl">
              <p>2x1</p>
              <Input
                name={"2x1"}
                type={"checkbox"}
                checked={twone}
                onChange={handleTwone}
              />
            </div>
          ) : (
            <></>
          )}
          <p>
            Valor de entrada:{" "}
            <span className="text-red-500 font-semibold capitalize">
              {existingEvent?.currentTicket}
            </span>
          </p>
          <div className="mt-8">
            <Button name={"Generar tickets"} onClick={handleCreateInvite} />
          </div>
        </div>
        <div ref={ticketRef}>
          <Ticket
            name={name}
            lastName={lastName}
            dni={dni}
            tickets={tickets}
            date={date}
            location={location}
          />
        </div>
      </div>
    </section>
  );
}

export default TicketForm;
