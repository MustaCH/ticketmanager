import React, { useEffect, useState } from "react";
import { IoStatsChart } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { AiOutlineQrcode } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

function NavMobile() {
  const [activePage, setActivePage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

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
        <NavLink to={"/guestList"}>
          <button
            className={
              activePage === "/guestList" ? `text-red-600` : `text-gray-400`
            }
          >
            <GoChecklist />
          </button>
        </NavLink>
        <NavLink to={"/chat"}>
          <button
            className={
              activePage === "/chat" ? `text-red-600` : `text-gray-400`
            }
          >
            <IoStatsChart />
          </button>
        </NavLink>
        <div>
          <button>
            <RiLogoutBoxLine onClick={handleLogout} />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavMobile;
