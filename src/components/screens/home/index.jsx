import React, { useEffect, useState } from "react";
import { Button, Input, TicketForm } from "../../shared";
import { createEvent, getEvent } from "../../../database/firebase";

function Home() {
  const eventData = { date: "", location: "" };
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [inversion, setInversion] = useState("");
  const [presale, setPresale] = useState("");
  const [presaleDate, setPresaleDate] = useState("");
  const [general, setGeneral] = useState("");
  const [generalDate, setGeneralDate] = useState("");
  const [showEventForm, setShowEventForm] = useState(false);
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

  const handleEventCreation = async (
    date,
    location,
    link,
    inversion,
    presale,
    general
  ) => {
    try {
      await createEvent(
        date,
        location,
        link,
        inversion,
        presale,
        presaleDate,
        general,
        generalDate
      );
      setEventDate(date);
      setEventLocation(location);
      setPaymentLink(link);
      setInversion(inversion);
      setPresale(presale);
      setPresaleDate(presaleDate);
      setGeneral(general);
      setGeneralDate(generalDate);
      setShowEventForm(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el evento: ", error);
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
          </div>
        ) : showEventForm ? (
          <div className="flex flex-col w-96 lg:w-1/2 self-center">
            <h1 className="text-2xl font-bold text-center mb-4">
              Crear evento:
            </h1>
            <div className="flex flex-col gap-4">
              <Input
                label={"Fecha del evento:"}
                type={"date"}
                onChange={(e) => setEventDate(e.target.value)}
              />
              <Input
                label={"Ubicación"}
                type={"text"}
                onChange={(e) => setEventLocation(e.target.value)}
              />
              <Input
                label={"Link de pago"}
                type={"text"}
                onChange={(e) => setPaymentLink(e.target.value)}
              />
              <Input
                label={"Inversion"}
                type={"text"}
                onChange={(e) => setInversion(e.target.value)}
              />
              <div className="flex flex-col gap-1 lg:flex-row justify-between">
                <Input
                  label={"Valor entrada (Preventa):"}
                  type={"number"}
                  onChange={(e) => setPresale(e.target.value)}
                  customStyle={"lg:w-96"}
                />
                <Input
                  label={"Fecha finalización (Preventa):"}
                  type={"date"}
                  onChange={(e) => setPresaleDate(e.target.value)}
                  customStyle={"lg:w-96"}
                />
              </div>
              <div className="flex flex-col gap-1 lg:flex-row justify-between">
                <Input
                  label={"Valor entrada (General):"}
                  type={"number"}
                  onChange={(e) => setGeneral(e.target.value)}
                  customStyle={"lg:w-96"}
                />
                <Input
                  label={"Fecha inicio (General):"}
                  type={"date"}
                  onChange={(e) => setGeneralDate(e.target.value)}
                  customStyle={"lg:w-96"}
                />
              </div>

              <Button
                name={"Crear evento"}
                onClick={() =>
                  handleEventCreation(
                    eventDate,
                    eventLocation,
                    paymentLink,
                    inversion,
                    presale,
                    presaleDate,
                    general,
                    generalDate
                  )
                }
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
