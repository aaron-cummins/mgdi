import React, { useEffect, useContext } from "react";
import { VistasGroupContext } from "../context/vistasGroupContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaVistasGroup = ({ openModal }) => {
  const { vistasgroupList, obtenerVistasGrouplist, obtenerVistasGroup } = useContext(VistasGroupContext);

  const { obtenerModulos } = useContext(SelectsContext);

  const getVistasGroup = (props) => obtenerVistasGroup(props).then(openModal());

  useEffect(() => {
    obtenerVistasGrouplist();
    obtenerModulos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Modulo (id)", selector: (row) => row.id_modulo, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props?.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getVistasGroup(props)} nombreform="vistasgroup" />,
    },
  ];

  return <Tabla data={vistasgroupList} columns={columns} />;
};

export default TablaVistasGroup;
