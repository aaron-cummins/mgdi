import React, { useEffect, useContext } from "react";
import { TipoFiltradoContext } from "../context/tipofiltradoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaTipoFiltrado = ({ openModal }) => {
  const { tipofiltradoList, obtenerTipoFiltrados, obtenerTipoFiltrado } = useContext(TipoFiltradoContext);

  const getTipoFiltrado = (props) => obtenerTipoFiltrado(props).then(openModal());

  useEffect(() => {
    obtenerTipoFiltrados();
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
        <OpcionesTabla editar={true} FnEditar={() => getTipoFiltrado(props)} nombreform="tipofiltrado" />
      ),
    },
  ];
  return <Tabla columns={columns} data={tipofiltradoList} />;
};

export default TablaTipoFiltrado;
