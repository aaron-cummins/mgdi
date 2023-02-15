import React, { useEffect, useContext } from "react";
import { EstadoMotorInstalacionContext } from "../context/EstadoMotorInstalacionContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaEstadoMotorInstalacion = () => {
  const { EstadoMotorInstalacionList, obtenerEstadoMotorInstalacion, obtenerEstadoMotorInstalaciones } =
    useContext(EstadoMotorInstalacionContext);

  const getEstadoMotorInstalacion = (props) => {
    obtenerEstadoMotorInstalacion(props);
  };

  useEffect(() => {
    obtenerEstadoMotorInstalaciones();
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
          FnEditar={() => getEstadoMotorInstalacion(props)}
          nombreform="estadomotorinstalacion"
        />
      ),
    },
  ];

  return <Tabla columns={columns} data={EstadoMotorInstalacionList} />;
};

export default TablaEstadoMotorInstalacion;
