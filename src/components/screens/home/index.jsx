import React, { useEffect, useState } from "react";
import { Button, Input, TicketForm } from "../../shared";
import { TbTrashXFilled } from "react-icons/tb";
import {
  createEvent,
  deleteAllGuests,
  deleteEvent,
  getEvent,
} from "../../../database/firebase";

function Home() {
  const eventData = { date: "", location: "" };
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [showEventForm, setShowEventForm] = useState(true);
  const [existingEvent, setExistingEvent] = useState(null);

  useEffect(() => {
    const checkExistingEvent = async () => {
      try {
        const event = await getEvent();
        if (event) {
          setExistingEvent(event);
          setShowEventForm(false);
        } else {
          setShowEventForm(true);
        }
      } catch (error) {
        console.error("Error al verificar el evento existente: ", error);
      }
    };

    checkExistingEvent();
  }, []);

  const handleEventCreation = async (date, location) => {
    try {
      await createEvent(date, location);
      setEventDate(date);
      setEventLocation(location);
      setShowEventForm(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el evento: ", error);
    }
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
        setExistingEvent(null);
        setShowEventForm(true);
        deleteAllGuests();
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 py-8 pb-24 lg:pb-0 min-h-screen">
      <section className="lg:ps-24 text-white flex justify-center">
        {existingEvent ? (
          <div className="flex justify-center items-center gap-2 lg:gap-4 text-sm">
            <p className="text-red-500">
              <span className="font-bold text-white pe-2">Evento actual:</span>{" "}
              {existingEvent.date} - {existingEvent.location}
            </p>
            <TbTrashXFilled
              className="text-red-500 text-lg cursor-pointer"
              onClick={handleEventDeletion}
            />
          </div>
        ) : showEventForm ? (
          <div className="flex flex-col w-1/2 self-center">
            <h1 className="text-2xl font-bold text-center mb-4">
              Crear evento:
            </h1>
            <div className="flex flex-col gap-4">
              <Input
                label={"Fecha:"}
                type={"date"}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <Input
                label={"Ubicación"}
                type={"text"}
                onChange={(e) => setEventLocation(e.target.value)}
              />
              <Button
                name={"Crear evento"}
                onClick={() => handleEventCreation(eventDate, eventLocation)}
              />
            </div>
          </div>
        ) : null}
      </section>
      <section className={existingEvent ? "inline lg:ps-24" : "hidden"}>
        <div className="flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl font-bold text-white mb-8 uppercase">
            Ticket Manager
          </h2>
        </div>
        <main className="flex flex-col-reverse gap-24 justify-evenly">
          <TicketForm
            date={existingEvent ? existingEvent.date : eventData.date}
            location={
              existingEvent ? existingEvent.location : eventData.location
            }
          />
        </main>
      </section>
    </div>
  );
}

export default Home;
