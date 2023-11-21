import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getGuests, getGuestsData } from "../../../../../database/firebase";
import Bars from "./barchart";

function TicketSell() {
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [ticketsData, setTicketsData] = useState({
    soldPresale: 0,
    soldGeneral: 0,
    sold2x1: 0,
  });

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

            const ticketValue = parseFloat(guest.ticketValue);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const guestsData = await getGuestsData();
        setTicketsData(guestsData);
      } catch (error) {
        console.error("Error al obtener los datos de los invitados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-96 h-96">
      <div className="flex flex-col gap-8 px-6 pt-6">
        <h2 className="text-xl font-bold text-white text-center">
          Entradas vendidas
        </h2>
        <div className="flex flex-col justify-center">
          <p className="text-white text-lg font-semibold">
            Total vendido:{" "}
            <span className="text-green-500">{totalTickets}</span> entradas
          </p>
          <Bars ticketsData={ticketsData} />
          <p className="text-white/80 text-lg font-semibold">
            Recaudado: ${totalRevenue}
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
