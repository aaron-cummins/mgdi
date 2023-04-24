import React, { useEffect, useContext } from "react";
import { ModuloControlContext } from "../context/moduloControlContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaModuloControl = ({ openModal }) => {
  const { modulocontrolList, obtenerModulosControl, obtenerModuloControl } = useContext(ModuloControlContext);

  const getModuloControl = (props) => obtenerModuloControl(props).then(openModal());

  useEffect(() => {
    obtenerModulosControl();
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
        <OpcionesTabla editar={true} FnEditar={() => getModuloControl(props)} nombreform="modulocontrol" />
      ),
    },
  ];

  return <Tabla columns={columns} data={modulocontrolList} />;
};

export default TablaModuloControl;
