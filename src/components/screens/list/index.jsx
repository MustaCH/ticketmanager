import React, { useEffect, useState } from "react";
import { getGuests } from "../../../database/firebase";
import { Search } from "../../shared";

function List() {
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
    <div className="bg-neutral-900  lg:px-12 lg:pb-12 min-h-screen">
      {" "}
      <Search placeholder={"Buscar invitados"} data={guests} />
    </div>
  );
}

export default List;
