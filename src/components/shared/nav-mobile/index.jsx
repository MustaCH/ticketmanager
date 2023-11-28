import React, { useEffect, useState } from "react";
import { IoStatsChart } from "react-icons/io5";
import { IoMdQrScanner } from "react-icons/io";
import { GoChecklist, GoTasklist } from "react-icons/go";
import { AiOutlineQrcode } from "react-icons/ai";
import { MdOutlineRequestQuote } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

function NavMobile() {
  const [activePage, setActivePage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <div className="relative z-50">
      <nav className="bg-zinc-900 lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 p-4 px-10 flex justify-between rounded-tr-xl rounded-tl-xl">
        <NavLink to={"/ticketmanager"}>
          <button
            className={
              activePage === "/ticketmanager" ? `text-red-600` : `text-gray-400`
            }
          >
            <AiOutlineQrcode />
          </button>
        </NavLink>
        <NavLink to={"/scanner"}>
          <button
            className={
              activePage === "/scanner" ? `text-red-600` : `text-gray-400`
            }
          >
            <IoMdQrScanner />
          </button>
        </NavLink>
        <NavLink to={"/guestList"}>
          <button
            className={
              activePage === "/guestList" ? `text-red-600` : `text-gray-400`
            }
          >
            <GoChecklist />
          </button>
        </NavLink>
        <NavLink to={"/stats"}>
          <button
            className={
              activePage === "/stats" ? `text-red-600` : `text-gray-400`
            }
          >
            <IoStatsChart />
          </button>
        </NavLink>
        <NavLink to={"/quote"}>
          <button
            className={
              activePage === "/quote" ? `text-red-600` : `text-gray-400`
            }
          >
            <MdOutlineRequestQuote />
          </button>
        </NavLink>
        <NavLink to={"/tasks"}>
          <button
            className={
              activePage === "/tasks" ? `text-red-600` : `text-gray-400`
            }
          >
            <GoTasklist />
          </button>
        </NavLink>
      </nav>
    </div>
  );
}

export default NavMobile;
