import React, { useEffect, useContext } from "react";
import { EstadoEquipoInstalacionContext } from "../context/EstadoEquipoInstalacionContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaEstadoEquipoInstalacion = ({ openModal }) => {
  const { EstadoEquipoInstalacionList, obtenerEstadoEquipoInstalacion, obtenerEstadoEquipoInstalaciones } =
    useContext(EstadoEquipoInstalacionContext);

  const getEstadoEquipoInstalacion = (props) => {
    obtenerEstadoEquipoInstalacion(props).then(openModal());
  };

  useEffect(() => {
    obtenerEstadoEquipoInstalaciones();
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
        <OpcionesTabla
          editar={true}
          FnEditar={() => getEstadoEquipoInstalacion(props)}
          nombreform="estadoequipoinstalacion"
        />
      ),
    },
  ];

  return <Tabla columns={columns} data={EstadoEquipoInstalacionList} />;
};

export default TablaEstadoEquipoInstalacion;
