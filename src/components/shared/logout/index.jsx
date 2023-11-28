import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

function Logout() {
  const handleLogout = () => {
    if (window.confirm("¿Estás seguro que deseas cerrar sesión?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-end px-4 lg:hidden">
      <button className="text-2xl text-white/70">
        <RiLogoutBoxLine onClick={handleLogout} />
      </button>
    </div>
  );
}

export default Logout;
