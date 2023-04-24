import React, { useEffect, useContext } from "react";
import { TipoSalidaContext } from "../context/TipoSalidaContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaTipoSalida = ({ openModal }) => {
  const { TipoSalidaList, obtenerTipoSalida, obtenerTipoSalidas } = useContext(TipoSalidaContext);

  const getTipoSalida = (props) => {
    obtenerTipoSalida(props).then(openModal());
  };

  useEffect(() => {
    obtenerTipoSalidas();
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
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getTipoSalida(props)} nombreform="tiposalida" />,
    },
  ];

  return <Tabla columns={columns} data={TipoSalidaList} />;
};

export default TablaTipoSalida;
