import React, { useEffect, useContext } from "react";
import { UbContext } from "../context/ubContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaUb = ({ openModal }) => {
  const { ubList, obtenerUbs, obtenerUb } = useContext(UbContext);

  const getUb = (props) => obtenerUb(props).then(openModal());

  useEffect(() => {
    obtenerUbs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Procesamiento", selector: (row) => row.procesamiento, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getUb(props)} nombreform="ub" />,
    },
  ];

  return <Tabla columns={columns} data={ubList} />;
};

export default TablaUb;
