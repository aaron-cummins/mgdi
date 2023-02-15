import React, { useEffect, useContext } from "react";
import { RegionContext } from "../context/regionContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaRegiones = () => {
  const { regionList, obtenerRegiones, obtenerRegion } = useContext(RegionContext);

  const getRegion = (props) => obtenerRegion(props);

  useEffect(() => {
    obtenerRegiones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Número", selector: (row) => row.numero, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getRegion(props)} nombreform="region" />,
    },
  ];

  return <Tabla columns={columns} data={regionList} />;
};

export default TablaRegiones;
