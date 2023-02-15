import React, { useEffect, useContext } from "react";
import { FlotaContext } from "../context/flotaContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaFlotas = () => {
  const { flotaList, obtenerFlotas, obtenerFlota } = useContext(FlotaContext);
  const getFlota = (props) => obtenerFlota(props);

  useEffect(() => {
    obtenerFlotas();
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
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getFlota(props)} nombreform="flota" />,
    },
  ];

  return <Tabla columns={columns} data={flotaList} />;
};

export default TablaFlotas;
