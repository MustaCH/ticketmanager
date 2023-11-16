import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getGuests } from "../../../../../database/firebase";

function TicketSell() {
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const guestsData = await getGuests();

        let ticketsSold = 0;
        let revenue = 0;

        guestsData.forEach((guest) => {
          const ticketsNumber = parseInt(guest.tickets);

          if (!isNaN(ticketsNumber)) {
            ticketsSold += ticketsNumber;
            const ticketValue = parseInt(guest.ticketValue);
            if (!isNaN(ticketValue)) {
              if (guest.twone === true) {
                revenue += 0.5 * ticketValue * ticketsNumber;
              } else {
                revenue += ticketValue * ticketsNumber;
              }
            } else {
              console.error("Valor del ticket no es un número válido:", guest);
            }
          } else {
            console.error(
              "Tickets no es un número válido para el invitado:",
              guest
            );
          }
        });

        setTotalTickets(ticketsSold);
        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Error al obtener los datos de los invitados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-96 h-80">
      <div className="flex flex-col gap-16 px-6 pt-6">
        <h2 className="text-xl font-bold text-white text-center">
          Entradas vendidas
        </h2>
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-white text-5xl font-semibold">{totalTickets}</p>
          <p className="text-white/80 text-2xl font-semibold">
            ${totalRevenue}
          </p>
        </div>
      </div>
      <div className="group fixed bottom-0 w-full flex justify-center bg-neutral-500 hover:bg-neutral-900 duration-150 py-2 rounded-br-lg rounded-bl-lg">
        <Link
          to={"/guestList"}
          className="flex flex-col items-center font-bold text-gray-300 group-hover:text-red-500 duration-150"
        >
          Revisar lista <AiOutlineUnorderedList className="text-2xl" />
        </Link>
      </div>
    </section>
  );
}

export default TicketSell;
