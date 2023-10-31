import React, { useEffect, useState } from "react";
import { IoStatsChart } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { AiOutlineQrcode } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

const NavDesktop = () => {
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
    <nav className="hidden bg-neutral-800 fixed left-0 top-0 w-28 h-full lg:flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl">
      <div>
        <ul className="pl-4">
          <NavLink to={"/ticketmanager"}>
            <div className="my-5">
              <img
                className="px-2"
                src="https://i.ibb.co/0rVDbnK/SBS808-LOGOredu-RED.png"
                alt="logo-redu"
              />
            </div>
          </NavLink>
          <li
            className={` p-4 rounded-tl-xl rounded-bl-xl ${
              activePage === "/ticketmanager"
                ? "bg-neutral-900"
                : "bg-neutral-800 "
            }`}
          >
            <NavLink
              to="/ticketmanager"
              className={` p-4 flex justify-center rounded-xl ${
                activePage === "/ticketmanager"
                  ? "bg-red-600 text-white"
                  : "bg-neutral-900 text-red-600 hover:bg-red-600 hover:text-white duration-300"
              }`}
            >
              <AiOutlineQrcode className="text-2xl" />
            </NavLink>
          </li>
          <li
            className={` p-4 rounded-tl-xl rounded-bl-xl ${
              activePage === "/guestList" ? "bg-neutral-900" : "bg-neutral-800 "
            }`}
          >
            <NavLink
              to="./guestList"
              className={` p-4 flex justify-center rounded-xl ${
                activePage === "/guestList"
                  ? "bg-red-600 text-white"
                  : "bg-neutral-900 text-red-600 hover:bg-red-600 hover:text-white duration-300"
              }`}
            >
              <GoChecklist className="text-2xl" />
            </NavLink>
          </li>
          <li
            className={` p-4 rounded-tl-xl rounded-bl-xl ${
              activePage === "/stats" ? "bg-neutral-900" : "bg-neutral-800 "
            }`}
          >
            <NavLink
              to="./stats"
              className={` p-4 flex justify-center rounded-xl ${
                activePage === "/stats"
                  ? "bg-red-600 text-white"
                  : "bg-neutral-900 text-red-600 hover:bg-red-600 hover:text-white duration-300"
              }`}
            >
              <IoStatsChart className="text-2xl" />
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="p-4 flex justify-center rounded-xl text-red-600">
        <RiLogoutBoxLine
          className="text-2xl cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
};

export default NavDesktop;
