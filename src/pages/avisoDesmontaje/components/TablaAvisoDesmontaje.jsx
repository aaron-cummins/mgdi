import React, { useEffect, useContext } from "react";
import { AvisoDesmontajeContext } from "../context/avisoDesmontajeContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaAvisoDesmontaje = () => {
  const { avisoDesmontajeList, obtenerAvisoDesmontajes, obtenerAvisoDesmontaje } = useContext(AvisoDesmontajeContext);

  const getAvisoDesmontaje = (props) => obtenerAvisoDesmontaje(props);

  useEffect(() => {
    obtenerAvisoDesmontajes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getAvisoDesmontaje(props)} nombreform="ad" />,
    },
  ];

  return <Tabla columns={columns} data={avisoDesmontajeList} />;
};

export default TablaAvisoDesmontaje;
