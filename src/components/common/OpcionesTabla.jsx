import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { Tooltip } from "@mui/material";

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
        <Tooltip key={`tooltip-editar`} title="Editar" placement="right" arrow>
          <button
            type="button"
            onClick={() => FnEditar()}
            className={`${buttonStyle} bg-blue-light-cummins`}
            data-te-toggle="modal"
            data-te-target={`#${nombreform}-modal`}
            data-te-ripple-init>
            <FaRegEdit />
          </button>
        </Tooltip>
      )}

      {editarNoModal && (
        <Tooltip key={`tooltip-editar`} title="Editar" placement="right" arrow>
          <button type="button" onClick={() => FnEditar()} className={`${buttonStyle} bg-blue-light-cummins`}>
            <FaRegEdit />
          </button>
        </Tooltip>
      )}

      {info && (
        <Tooltip key={`tooltip-info`} title={tooltip} placement="right" arrow>
          <button type="button" onClick={() => FnInfo()} className={`${buttonStyle} bg-yellow-400`}>
            <GrContactInfo />
          </button>
        </Tooltip>
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
