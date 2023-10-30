import React, { useEffect, useState } from "react";
import { Search, TicketForm } from "../../shared";
import { getGuests } from "../../../database/firebase";

function Home() {
  const eventDate = "24/11/2023";
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getGuestsData = await getGuests();
        setGuests(getGuestsData);
      } catch (error) {
        console.error("Error al obtener invitados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" flex flex-col gap-8 py-8">
      <header className="flex flex-col justify-center items-center p-4">
        <img
          className="w-1/2 lg:w-56"
          src="https://i.ibb.co/rH6fG0Y/SBS808-LOGOcomp-RED.png"
          alt="SBS808-LOGO"
          border="0"
        />
      </header>
      <main className="flex flex-col-reverse gap-24 justify-evenly">
        <Search placeholder={"Buscar invitados"} data={guests} />
        <TicketForm date={eventDate} />
      </main>
    </div>
  );
}

export default Home;
