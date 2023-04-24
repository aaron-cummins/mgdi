import React, { useEffect, useContext } from "react";
import { ZonaContext } from "../context/zonaContext";
import { SelectsContext } from "contexts/SelectsContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaZona = ({ openModal }) => {
  const { zonaList, obtenerZonalist, obtenerZona } = useContext(ZonaContext);
  const { obtenerPais } = useContext(SelectsContext);
  const getZona = (props) => obtenerZona(props).then(openModal());

  useEffect(() => {
    obtenerZonalist();
    obtenerPais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "País", selector: (row) => row.pais?.nombre, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getZona(props)} nombreform="zona" />,
    },
  ];

  return <Tabla columns={columns} data={zonaList} />;
};

export default TablaZona;
