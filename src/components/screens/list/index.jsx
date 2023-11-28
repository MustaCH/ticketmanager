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
    <div className="pb-24 lg:ps-24 lg:pb-12 min-h-screen">
      <div className="flex flex-col">
        <Search
          placeholder={"Buscar entradas"}
          data={guests}
          searchName={"Lista de entradas"}
        />
        <Search
          placeholder={"Buscar VIP"}
          data={guests}
          searchName={"Lista VIP"}
        />
      </div>
    </div>
  );
}

export default List;
