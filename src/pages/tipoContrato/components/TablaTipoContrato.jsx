import React, { useEffect, useContext } from "react";
import { TipoContratoContext } from "../context/TipoContratoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaTipoContrato = () => {
  const { TipoContratoList, obtenerTipoContrato, obtenerTipoContratos } = useContext(TipoContratoContext);

  const getTipoContrato = (props) => {
    obtenerTipoContrato(props);
  };

  useEffect(() => {
    obtenerTipoContratos();
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
        <OpcionesTabla editar={true} FnEditar={() => getTipoContrato(props)} nombreform="tipocontrato" />
      ),
    },
  ];

  return <Tabla columns={columns} data={TipoContratoList} />;
};

export default TablaTipoContrato;
