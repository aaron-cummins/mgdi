import React, { useContext, useEffect } from "react";
import { LugarTrabajoContext } from "../contexts/LugarTrabajoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaLugarTrabajo = () => {
  const { lugartrabajoList, obtenerLugaresTrabajo, obtenerLugarTrabajo } = useContext(LugarTrabajoContext);

  const {
    //obtenerRegiones,
    obtenerComunas,
    obtenerZonas,
    obtenerTipoLugarTrabajo,
  } = useContext(SelectsContext);

  const getLugarTrabajo = (props) => obtenerLugarTrabajo(props);

  useEffect(() => {
    obtenerLugaresTrabajo();
    obtenerZonas();
    //obtenerRegiones();
    obtenerComunas();
    obtenerTipoLugarTrabajo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Abreviación", selector: (row) => row.abreviacion, sortable: true },
    {
      name: "Tipo",
      selector: (row) => row.tipoLugarTrabajo?.tipo,
      sortable: true,
    },
    { name: "Comuna", selector: (row) => row.comuna.nombre, sortable: true },
    { name: "Zona", selector: (row) => row.zona?.nombre, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla editar={true} FnEditar={() => getLugarTrabajo(props)} nombreform="lugarTrabajo" />
      ),
    },
  ];

  return <Tabla data={lugartrabajoList} columns={columns} />;
};

export default TablaLugarTrabajo;
