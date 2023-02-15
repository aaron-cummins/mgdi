import React, { useEffect, useContext } from "react";
import { OemContext } from "../context/oemContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaOem = () => {
  const { oemList, obtenerOems, obtenerOem } = useContext(OemContext);

  const getOem = (props) => {
    obtenerOem(props);
  };

  useEffect(() => {
    obtenerOems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Abreviación", selector: (row) => row.abreviacion, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getOem(props)} nombreform="oem" />,
    },
  ];

  return <Tabla columns={columns} data={oemList} />;
};

export default TablaOem;
