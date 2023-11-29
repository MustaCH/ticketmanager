import React, { useEffect, useState } from "react";
import { getGuests, getVips } from "../../../database/firebase";
import { Button, Search } from "../../shared";

function List() {
  const [guests, setGuests] = useState([]);
  const [vips, setVips] = useState([]);
  const [displayList, setDisplayList] = useState("guests");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getGuestsData = await getVips();
        setVips(getGuestsData);
      } catch (error) {
        console.error("Error al obtener vips:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pb-24 lg:ps-24 lg:pb-12 min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-white font-bold mb-8 mt-8 uppercase">
          Listas de invitados
        </h1>
        <div className="flex gap-8">
          <Button
            name={"Entradas"}
            onClick={() => setDisplayList("guests")}
            customStyle={
              displayList !== "guests" ? "bg-gray-500 opacity-50" : ""
            }
          />
          <Button
            name={"Lista VIP"}
            onClick={() => setDisplayList("VIP")}
            customStyle={
              displayList === "guests" ? "bg-gray-500 opacity-50" : ""
            }
          />
        </div>
        {displayList === "guests" ? (
          <Search
            placeholder={"Buscar entradas"}
            data={guests}
            searchName={"Lista de entradas"}
          />
        ) : (
          <Search
            placeholder={"Buscar VIP"}
            data={vips}
            searchName={"Lista VIP"}
            showValue={false}
          />
        )}
      </div>
    </div>
  );
}

export default List;
