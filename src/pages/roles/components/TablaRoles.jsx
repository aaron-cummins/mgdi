import React, { useEffect, useContext } from "react";
import { RolesContext } from "../context/rolesContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaRoles = ({ openModal }) => {
  const { rolesList, obtenerRoleslist, obtenerRoles } = useContext(RolesContext);
  const getRoles = (props) => obtenerRoles(props).then(openModal());

  useEffect(() => {
    obtenerRoleslist();
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
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getRoles(props)} nombreform="roles" />,
    },
  ];

  return <Tabla columns={columns} data={rolesList} title={"Listado de Roles"} />;
};

export default TablaRoles;
