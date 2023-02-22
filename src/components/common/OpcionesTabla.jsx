import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const OpcionesTabla = ({
  editarNoModal,
  editar,
  FnEditar,
  tooltip,
  eliminar,
  FnEliminar,
  info,
  FnInfo,
  nombreform,
}) => {
  const buttonStyle = "text-white py-1 px-2 capitalize rounded-2xl text-md";

  return (
    <>
      {editar && (
        <TooltipComponent key={`tooltip-editar`} content="Editar" position="RightCenter">
          <button
            type="button"
            onClick={() => FnEditar()}
            className={`${buttonStyle} bg-blue-light-cummins`}
            data-te-toggle="modal"
            data-te-target={`#${nombreform}-modal`}
            data-te-ripple-init>
            <FaRegEdit />
          </button>
        </TooltipComponent>
      )}

      {editarNoModal && (
        <TooltipComponent key={`tooltip-editar`} content="Editar" position="RightCenter">
          <button type="button" onClick={() => FnEditar()} className={`${buttonStyle} bg-blue-light-cummins`}>
            <FaRegEdit />
          </button>
        </TooltipComponent>
      )}

      {info && (
        <TooltipComponent key={`tooltip-info`} content={tooltip} position="RightCenter">
          <button type="button" onClick={() => FnInfo()} className={`${buttonStyle} bg-yellow-400`}>
            <GrContactInfo />
          </button>
        </TooltipComponent>
      )}

      {eliminar && (
        <button type="button" onClick={() => FnEliminar()} className={`${buttonStyle} bg-red-cummins`}>
          <MdOutlineDelete />
        </button>
      )}
    </>
  );
};

export default OpcionesTabla;
