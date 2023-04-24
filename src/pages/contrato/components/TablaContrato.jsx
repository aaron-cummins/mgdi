import React, { useEffect, useContext } from "react";
import { ContratoContext } from "../context/contratoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import { formatDateshort } from "utilities/Utiles";

const TablaContrato = ({ openModal }) => {
  const { contratoList, obtenerContratos, obtenerContrato } = useContext(ContratoContext);
  const { obtenerTipoContrato, obtenerMonitoreoFiltro, obtenerMonitoreoMotor } = useContext(SelectsContext);

  const getContrato = (props) => {
    obtenerContrato(props).then(openModal());
  };
  useEffect(() => {
    obtenerContratos();
    obtenerTipoContrato();
    obtenerMonitoreoFiltro();
    obtenerMonitoreoMotor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Faena", selector: (row) => row.flotaLugarTrabajo.lugarTrabajo?.nombre, sortable: true },
    { name: "Flota", selector: (row) => row.flotaLugarTrabajo.flotas?.nombre, sortable: true },
    { name: "Fec. Inicio", selector: (row) => formatDateshort(row.fechaInicio), sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getContrato(props)} nombreform="contrato" />,
    },
  ];

  return <Tabla columns={columns} data={contratoList} />;
};

export default TablaContrato;
