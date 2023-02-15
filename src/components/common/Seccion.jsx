import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { TbNewSection } from "react-icons/tb";

const Seccion = (props) => {
  return (
    <div className={`mb-2 border-solid border-1 ${props.visible ? "" : "hidden"} bg-white`}>
      <div className="flex justify-between items-center gap-2 mt-3 mb-2 pl-2 pr-2">
        <span className="text-sm text-gray-00 uppercase font-semibold inline-flex items-center gap-2">
          <TbNewSection />
          {props.titulo}
        </span>
        <span>{props.icono ? props.icono : <AiOutlineAppstoreAdd />}</span>
      </div>
      <div className="justify-between items-center mb-2 mt-1 pl-2 pr-2 p-4 border-t-1">{props.children}</div>
    </div>
  );
};

export default Seccion;
