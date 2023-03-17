import React, { useEffect, useContext } from "react";
import { AvisoMontajeContext } from "../context/avisoMontajeContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaAvisoMontaje = () => {
  const { avisoMontajeList, obtenerAvisoMontajes, obtenerAvisoMontaje } = useContext(AvisoMontajeContext);

  const getAvisoMontaje = (props) => obtenerAvisoMontaje(props);

  useEffect(() => {
    obtenerAvisoMontajes();
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
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getAvisoMontaje(props)} nombreform="am" />,
    },
  ];

  return <Tabla columns={columns} data={avisoMontajeList} />;
};

export default TablaAvisoMontaje;
