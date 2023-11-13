import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";
import {
  deleteAllGuests,
  deleteEvent,
  editEvent,
  getEvent,
} from "../../../../../database/firebase";
import { Button, Input } from "../../../../shared";

function CurrentEvent() {
  const [existingEvent, setExistingEvent] = useState();
  const [showInput, setShowInput] = useState("");
  const [newDate, setNewDate] = useState();
  const [newLocation, setNewLocation] = useState();
  const [newLink, setNewLink] = useState();
  const [newInversion, setNewInversion] = useState();
  const [newTicket, setNewTicket] = useState();
  const [ticketState, setNewTicketState] = useState();

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

  const handleEditDate = () => {
    const eventId = "main-event";

    if (newDate) {
      const updatedProperties = {
        date: newDate,
      };
      editEvent(eventId, updatedProperties);
    }
    setShowInput(false);
  };

  const handleEditLocation = () => {
    const eventId = "main-event";

    if (newLocation) {
      const updatedProperties = {
        location: newLocation,
      };
      editEvent(eventId, updatedProperties);
    }
    setShowInput(false);
  };

  const handleEditLink = () => {
    const eventId = "main-event";

    if (newLink) {
      const updatedProperties = {
        link: newLink,
      };
      editEvent(eventId, updatedProperties);
    }
    setShowInput(false);
  };

  const handleEditInversion = () => {
    const eventId = "main-event";

    if (newInversion) {
      const updatedProperties = {
        inversion: newInversion,
      };
      editEvent(eventId, updatedProperties);
    }
    setShowInput(false);
  };

  const handleEditTicket = () => {
    const eventId = "main-event";

    if (newTicket && ticketState) {
      const updatedProperties = {
        ticket: newTicket,
        currentTicket: ticketState,
      };
      editEvent(eventId, updatedProperties);
    }
    setShowInput(false);
  };

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
          {showInput === "date" ? (
            <>
              <Input
                label={"Fecha:"}
                type={"date"}
                customStyle={"font-thin"}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  name={"Editar"}
                  customStyle={"font-normal"}
                  onClick={handleEditDate}
                />
                <Button
                  name={"Cancelar"}
                  customStyle={"bg-transparent font-normal"}
                  onClick={() => {
                    setShowInput(false);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              <p className="flex justify-between items-center">
                Fecha:{" "}
                <AiOutlineEdit
                  className="text-gray-400 text-lg lg:text-2xl cursor-pointer"
                  onClick={() => {
                    setShowInput("date");
                  }}
                />
              </p>
              <span className="flex items-center justify-between font-normal text-base">
                {existingEvent?.date}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          {showInput === "location" ? (
            <>
              <Input
                label={"Locación:"}
                type={"address"}
                placeholder={existingEvent?.location}
                customStyle={"font-thin"}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  name={"Editar"}
                  customStyle={"font-normal"}
                  onClick={handleEditLocation}
                />
                <Button
                  name={"Cancelar"}
                  customStyle={"bg-transparent font-normal"}
                  onClick={() => {
                    setShowInput(false);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              <p className="flex justify-between items-center">
                Locación:{" "}
                <AiOutlineEdit
                  className="text-gray-400 text-lg lg:text-2xl cursor-pointer"
                  onClick={() => {
                    setShowInput("location");
                  }}
                />
              </p>
              <span className="flex items-center justify-between font-normal text-base">
                {existingEvent?.location}
              </span>{" "}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          {showInput === "link" ? (
            <>
              <Input
                label={"Link de pago:"}
                type={"text"}
                placeholder={existingEvent?.link}
                customStyle={"font-thin"}
                onChange={(e) => setNewLink(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  name={"Editar"}
                  customStyle={"font-normal"}
                  onClick={handleEditLink}
                />
                <Button
                  name={"Cancelar"}
                  customStyle={"bg-transparent font-normal"}
                  onClick={() => {
                    setShowInput(false);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              <p className="flex justify-between items-center">
                Link de pago:{" "}
                <AiOutlineEdit
                  className="text-gray-400 text-lg lg:text-2xl cursor-pointer"
                  onClick={() => {
                    setShowInput("link");
                  }}
                />
              </p>
              <span className="flex items-center justify-between font-normal text-base">
                {existingEvent?.link}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          {showInput === "inversion" ? (
            <>
              <Input
                label={"Monto invertido:"}
                type={"text"}
                placeholder={existingEvent?.inversion}
                customStyle={"font-thin"}
                onChange={(e) => setNewInversion(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  name={"Editar"}
                  customStyle={"font-normal"}
                  onClick={handleEditInversion}
                />
                <Button
                  name={"Cancelar"}
                  customStyle={"bg-transparent font-normal"}
                  onClick={() => {
                    setShowInput(false);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              <p className="flex justify-between items-center">
                Monto invertido:{" "}
                <AiOutlineEdit
                  className="text-gray-400 text-lg lg:text-2xl cursor-pointer"
                  onClick={() => {
                    setShowInput("inversion");
                  }}
                />
              </p>
              <span className="flex items-center justify-between font-normal text-base">
                ${existingEvent?.inversion}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 my-4 text-white text-lg font-semibold">
          {showInput === "ticket" ? (
            <>
              <div className="flex items-center gap-8">
                <Input
                  label={"Valor de entrada:"}
                  type={"text"}
                  placeholder={existingEvent?.ticket}
                  customStyle={"font-thin"}
                  onChange={(e) => setNewTicket(e.target.value)}
                />
                <form className="flex gap-8">
                  <Input
                    type={"radio"}
                    label={"Preventa"}
                    value={"preventa"}
                    checked={ticketState === "preventa"}
                    onChange={() => setNewTicketState("preventa")}
                  />
                  <Input
                    type={"radio"}
                    label={"General"}
                    value={"general"}
                    checked={ticketState === "general"}
                    onChange={() => setNewTicketState("general")}
                  />
                </form>
              </div>

              <div className="flex justify-end">
                <Button
                  name={"Editar"}
                  customStyle={"font-normal"}
                  onClick={handleEditTicket}
                />
                <Button
                  name={"Cancelar"}
                  customStyle={"bg-transparent font-normal"}
                  onClick={() => {
                    setShowInput(false);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <p className="flex justify-between items-center">
                Valor de entrada:
                <span
                  className={
                    existingEvent?.currentTicket === "preventa"
                      ? "text-red-500 capitalize"
                      : "text-green-600 capitalize"
                  }
                >
                  {existingEvent?.currentTicket}
                </span>{" "}
                <AiOutlineEdit
                  className="text-gray-400 text-lg lg:text-2xl cursor-pointer"
                  onClick={() => {
                    setShowInput("ticket");
                  }}
                />
              </p>
              <span className="flex items-center justify-between font-normal text-base truncate ">
                ${existingEvent?.ticket}
              </span>
            </>
          )}
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
