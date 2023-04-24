import React, { useEffect, useContext } from "react";
import { PaisContext } from "../context/paisContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaPais = ({ openModal }) => {
  const { paisList, obtenerPaises, obtenerPais } = useContext(PaisContext);

  const getPais = (props) => obtenerPais(props).then(openModal());

  useEffect(() => {
    obtenerPaises();
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
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getPais(props)} nombreform="pais" />,
    },
  ];

  return <Tabla columns={columns} data={paisList} />;
};

export default TablaPais;
