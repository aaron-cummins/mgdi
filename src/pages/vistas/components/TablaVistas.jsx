import React, { useEffect, useContext } from "react";
import { VistasContext } from "../context/vistasContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaVistas = () => {
  const { vistasList, obtenerVistas, obtenerVistaslist } = useContext(VistasContext);
  const getVistas = (props) => obtenerVistas(props);

  useEffect(() => {
    obtenerVistaslist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row?.id, sortable: true },
    { name: "Nombre", selector: (row) => row?.nombre, sortable: true },
    { name: "Accion", selector: (row) => row?.accion, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props?.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getVistas(props)} nombreform="vistas" />,
    },
  ];

  return <Tabla columns={columns} data={vistasList} />;
};

export default TablaVistas;
