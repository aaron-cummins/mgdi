import React from "react";
import { FiFilter } from "react-icons/fi";
import { useStateContext } from "contexts/ContextProvider";
import { FaUserCog } from "react-icons/fa";

const Filtros = (props) => {
  const { currentColor } = useStateContext();
  return (
    <div className="mb-2 border-solid border-1 bg-white">
      <div className="flex justify-between items-center gap-2 mt-3 mb-1 pl-2 pr-2">
        <span className="text-sm text-gray-00 uppercase font-semibold inline-flex items-center gap-2">
          <FaUserCog /> Filtro
        </span>
        <span>
          <FiFilter />
        </span>
      </div>
      <div
        className={`justify-between items-center mb-2 mt-1 pl-2 pr-2 pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-${
          props.columnas ? props.columnas : "4"
        } gap-4 border-t-1`}>
        {props.children}
      </div>
      <div className="flex justify-between items-center gap-2 mb-1 pl-2 pr-2">
        <span></span>
        <span>
          <button
            type="button"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-1 px-3 py-1.5 hover:drop-shadow-xl hover:bg-${currentColor} text-right inline-flex items-center`}
            onClick={props.Fn}
            id="filtro_ANZR_">
            Buscar
          </button>
        </span>
      </div>
    </div>
  );
};

export default Filtros;
