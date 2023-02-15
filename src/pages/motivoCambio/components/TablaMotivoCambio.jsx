import React, { useEffect, useContext } from "react";
import { MotivoCambioContext } from "../context/MotivoCambioContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaMotivoCambio = () => {
  const { MotivoCambioList, obtenerMotivoCambio, obtenerMotivoCambios } = useContext(MotivoCambioContext);

  const getMotivoCambio = (props) => {
    obtenerMotivoCambio(props);
  };

  useEffect(() => {
    obtenerMotivoCambios();
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
        <OpcionesTabla editar={true} FnEditar={() => getMotivoCambio(props)} nombreform="motivocambio" />
      ),
    },
  ];

  return <Tabla columns={columns} data={MotivoCambioList} />;
};

export default TablaMotivoCambio;
