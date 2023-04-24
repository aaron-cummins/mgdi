import React, { useEffect, useContext } from "react";
import { CargoContext } from "../context/cargoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaCargo = ({ openModal }) => {
  const { cargoList, obtenerCargos, obtenerCargo } = useContext(CargoContext);
  const getCargo = (props) => {
    obtenerCargo(props).then(openModal());
  };
  useEffect(() => {
    obtenerCargos();
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
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getCargo(props)} nombreform="cargo" />,
    },
  ];

  return <Tabla columns={columns} data={cargoList} />;
};

export default TablaCargo;
