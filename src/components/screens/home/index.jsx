import React from "react";
import { TicketForm } from "../../shared";

function Home() {
  const eventDate = "24/11/2023";

  return (
    <div className="flex flex-col gap-8 py-8 pb-24 lg:pb-12 min-h-screen">
      <header className="flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold text-white mb-8 uppercase">
          Ticket Manager
        </h1>
      </header>
      <main className="flex flex-col-reverse gap-24 justify-evenly">
        <TicketForm date={eventDate} />
      </main>
    </div>
  );
}

export default Home;
