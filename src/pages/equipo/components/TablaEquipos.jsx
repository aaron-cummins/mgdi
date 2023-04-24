import React, { useEffect, useContext } from "react";
import { EquipoContext } from "../context/equipoContext";
import { SelectsContext } from "contexts/SelectsContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaEquipos = ({ openModal }) => {
  const { equipoList, obtenerEquipos, obtenerEquipo } = useContext(EquipoContext);
  const getEquipo = (props) => {
    obtenerEquipo(props).then(openModal());
  };

  const { obtenerAplicacionOems, obtenerOems } = useContext(SelectsContext);

  useEffect(() => {
    obtenerEquipos();
    obtenerAplicacionOems();
    obtenerOems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Oem", selector: (row) => row.oem?.nombre, sortable: true },
    {
      name: "Aplicación Oem",
      selector: (row) => row.aplicacionOem?.nombre,
      sortable: true,
    },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getEquipo(props)} nombreform="equipo" />,
    },
  ];

  return <Tabla columns={columns} data={equipoList} />;
};

export default TablaEquipos;
