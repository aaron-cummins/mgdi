import React, { useEffect, useContext } from "react";
import { ModulosContext } from "../context/modulosContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaModulos = () => {
  const { modulosList, obtenerModuloslist, obtenerModulos } = useContext(ModulosContext);
  const getModulos = (props) => obtenerModulos(props);

  useEffect(() => {
    obtenerModuloslist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Controller", selector: (row) => row.controller, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getModulos(props)} nombreform="modulos" />,
    },
  ];
  return <Tabla columns={columns} data={modulosList} />;
};

export default TablaModulos;
