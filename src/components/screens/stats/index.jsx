import React from "react";
import { Admins, CurrentEvent, TicketSell } from "./components/index";

function Stats() {
  return (
    <div className="lg:ps-24 min-h-screen flex flex-col gap-12">
      <h1 className="text-3xl font-bold text-white uppercase text-center mt-12">
        Panel de control
      </h1>
      <div className="grid pb-24 place-items-center">
        <div className="self-center align-center grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 place-items-center gap-2 items-center">
          <CurrentEvent />
          <Admins />
          <TicketSell />
        </div>
      </div>
    </div>
  );
}

export default Stats;
