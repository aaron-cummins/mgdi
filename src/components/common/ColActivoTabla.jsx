import React from "react";

const ColActivoTabla = (props) => {
  return (
    <button
      type="button"
      className={`text-white py-1 px-2 capitalize rounded-2xl text-md ${
        props.activo ? "bg-green-light-cummins" : "bg-red-cummins"
      }`}
    >
      {props.activo ? "SI" : "NO"}
    </button>
  );
};

export default ColActivoTabla;
