import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Input } from "../../shared/index";

function TaskList() {
  return (
    <div className="lg:ps-28 flex flex-col items-center  min-h-screen">
      <h1 className="text-2xl my-12 text-white font-bold">Lista de tareas</h1>
      <div>
        <button className="flex  items-center justify-evenly gap-2 p-2 bg-red-700 text-white rounded-lg ">
          Nueva tarea <AiOutlinePlusCircle className="text-xl" />
        </button>
      </div>
      <section className="w-full h-screen mt-12 py-8 px-2 bg-neutral-800 rounded-lg drop-shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center bg-neutral-600 p-4 rounded-lg text-white">
          <div className="flex gap-4 lg:items-center">
            <Input
              type={"checkbox"}
              customStyle={
                "w-4 h-4 mt-2 lg:mt-0 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
              }
            />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <p>Masto</p>
          <p>Pendiente</p>
        </div>
      </section>
    </div>
  );
}

export default TaskList;
