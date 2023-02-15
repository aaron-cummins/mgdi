import React, { useContext, useEffect } from "react";
import { ConversionLugarTrabajoContext } from "../context/ConversionLugarTrabajoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaConversionLugarTrabajo = () => {
  const { ConversionLugarTrabajoList, obtenerConversionLugarTrabajos, obtenerConversionLugarTrabajo } = useContext(ConversionLugarTrabajoContext);

  const {
    obtenerLugaresTrabajo,
    obtenerFuenteInformacion,
  } = useContext(SelectsContext);

  const getConversionLugarTrabajo = (props) => obtenerConversionLugarTrabajo(props);

  useEffect(() => {
    obtenerConversionLugarTrabajos();
    obtenerFuenteInformacion();
    obtenerLugaresTrabajo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Abreviación", selector: (row) => row.abreviacion, sortable: true },
    { name: "Fuente Información", selector: (row) => row.fuenteInformacion?.nombre, sortable: true },
    { name: "Lugar trabajo", selector: (row) => row.lugarTrabajo?.nombre, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla editar={true} FnEditar={() => getConversionLugarTrabajo(props)} nombreform="conversionlugartrabajo" />
      ),
    },
  ];

  return <Tabla data={ConversionLugarTrabajoList} columns={columns} />;
};

export default TablaConversionLugarTrabajo;
