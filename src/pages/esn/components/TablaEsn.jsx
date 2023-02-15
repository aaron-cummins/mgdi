import React, { useEffect, useContext } from "react";
import { EsnContext } from "../context/esnContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaEsn = () => {
  const { esnList, obtenerEsnes, obtenerEsn } = useContext(EsnContext);
  const { obtenerVersionMotor } = useContext(SelectsContext);

  const getEsn = (props) => obtenerEsn(props);

  useEffect(() => {
    obtenerEsnes();
    obtenerVersionMotor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "ESN", selector: (row) => row.esn, sortable: true },
    { name: "Esn Placa", selector: (row) => row.esnPlaca, sortable: true },
    { name: "Versión Motor", selector: (row) => row.versionMotor?.nombreComercial, sortable: true },
    {
      name: "Montado",
      cell: (props) => <ColActivoTabla activo={props.montado} />,
      sortable: true,
    },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getEsn(props)} nombreform="esn" />,
    },
  ];

  return <Tabla columns={columns} data={esnList} />;
};

export default TablaEsn;
