import React, { useEffect, useContext } from "react";
import { MonitoreoMotorContext } from "../context/monitoreoMotorContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaMonitoreoMotor = () => {
  const { monitoreomotorList, obtenerMonitoreoMotors, obtenerMonitoreoMotor } = useContext(MonitoreoMotorContext);

  const getMonitoreoMotor = (props) => obtenerMonitoreoMotor(props);

  useEffect(() => {
    obtenerMonitoreoMotors();
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
        <OpcionesTabla editar={true} FnEditar={() => getMonitoreoMotor(props)} nombreform="monitoreomotor" />
      ),
    },
  ];

  return <Tabla columns={columns} data={monitoreomotorList} />;
};

export default TablaMonitoreoMotor;
