import React, { useEffect, useContext } from "react";
import { AplicacionOemContext } from "../context/aplicacionOemContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaAplicacionOem = () => {
  const { aplicacionOemList, obtenerAplicacionOem, obtenerAplicacionesOem } = useContext(AplicacionOemContext);
  const getAplicacionOem = (props) => obtenerAplicacionOem(props);

  useEffect(() => {
    obtenerAplicacionesOem();
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
        <OpcionesTabla editar={true} FnEditar={() => getAplicacionOem(props)} nombreform="aplicacionoem" />
      ),
    },
  ];

  return <Tabla columns={columns} data={aplicacionOemList} />;
};

export default TablaAplicacionOem;
