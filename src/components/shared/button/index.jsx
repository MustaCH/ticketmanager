import React from "react";

function Button({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-700 p-2 rounded-lg text-white hover:scale-110 duration-150"
    >
      {name}
    </button>
  );
}

export default Button;
