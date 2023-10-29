import React, { useState } from "react";
import { Search, TicketForm } from "../../shared";

function Home() {
  const [eventDate, setEventDate] = useState("24/11/2023");

  return (
    <div className=" flex flex-col gap-8 py-8">
      <header className="flex flex-col justify-center items-center p-4">
        <img
          className="w-1/2 lg:w-1/4"
          src="https://i.ibb.co/rH6fG0Y/SBS808-LOGOcomp-RED.png"
          alt="SBS808-LOGO"
          border="0"
        />
      </header>
      <main className="flex flex-col-reverse gap-24 justify-evenly">
        {/*<Search />*/}
        <TicketForm date={eventDate} />
      </main>
    </div>
  );
}

export default Home;
