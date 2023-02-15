import React, { useEffect, useContext } from "react";
import { EstadoEquipoContext } from "../context/EstadoEquipoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaEstadoEquipo = () => {
  const { EstadoEquipoList, obtenerEstadoEquipo, obtenerEstadoEquipos } = useContext(EstadoEquipoContext);

  const getEstadoEquipo = (props) => {
    obtenerEstadoEquipo(props);
  };

  useEffect(() => {
    obtenerEstadoEquipos();
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
        <OpcionesTabla editar={true} FnEditar={() => getEstadoEquipo(props)} nombreform="estadoequipo" />
      ),
    },
  ];

  return <Tabla columns={columns} data={EstadoEquipoList} />;
};

export default TablaEstadoEquipo;
