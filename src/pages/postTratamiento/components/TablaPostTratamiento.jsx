import React, { useEffect, useContext } from "react";
import { PostTratamientoContext } from "../context/PostTratamientoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaPostTratamiento = ({ openModal }) => {
  const { PostTratamientoList, obtenerPostTratamiento, obtenerPostTratamientos } = useContext(PostTratamientoContext);

  const getPostTratamiento = (props) => {
    obtenerPostTratamiento(props).then(openModal());
  };

  useEffect(() => {
    obtenerPostTratamientos();
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
        <OpcionesTabla editar={true} FnEditar={() => getPostTratamiento(props)} nombreform="posttratamiento" />
      ),
    },
  ];

  return <Tabla columns={columns} data={PostTratamientoList} />;
};

export default TablaPostTratamiento;
