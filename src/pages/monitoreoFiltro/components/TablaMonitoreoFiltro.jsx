import React, { useEffect, useContext } from "react";
import { MonitoreoFiltroContext } from "../context/monitoreoFiltroContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaMonitoreoFiltro = () => {
  const { monitoreofiltroList, obtenerMonitoreoFiltros, obtenerMonitoreoFiltro } = useContext(MonitoreoFiltroContext);

  const getMonitoreoFiltro = (props) => obtenerMonitoreoFiltro(props);

  useEffect(() => {
    obtenerMonitoreoFiltros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla editar={true} FnEditar={() => getMonitoreoFiltro(props)} nombreform="monitoreofiltro" />
      ),
    },
  ];

  return <Tabla columns={columns} data={monitoreofiltroList} />;
};

export default TablaMonitoreoFiltro;
