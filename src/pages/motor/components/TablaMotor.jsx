import React, { useEffect, useContext } from "react";
import { MotorContext } from "../context/motorContext";
import { SelectsContext } from "contexts/SelectsContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaMotors = ({ openModal }) => {
  const { motorList, obtenerMotors, obtenerMotor } = useContext(MotorContext);
  const { obtenerAplicaciones } = useContext(SelectsContext);
  const getMotor = (props) => obtenerMotor(props).then(openModal());

  useEffect(() => {
    obtenerMotors();
    obtenerAplicaciones();
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
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getMotor(props)} nombreform="motor" />,
    },
  ];

  return <Tabla columns={columns} data={motorList} />;
};

export default TablaMotors;
