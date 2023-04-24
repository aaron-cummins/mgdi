import React, { useEffect, useContext } from "react";
import { TipoCombustibleContext } from "../context/tipocombustibleContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaTipoCombustible = ({ openModal }) => {
  const { tipocombustibleList, obtenerTipoCombustibles, obtenerTipoCombustible } = useContext(TipoCombustibleContext);

  const getTipoCombustible = (props) => obtenerTipoCombustible(props).then(openModal());

  useEffect(() => {
    obtenerTipoCombustibles();
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
        <OpcionesTabla editar={true} FnEditar={() => getTipoCombustible(props)} nombreform="tipocombustible" />
      ),
    },
  ];

  return <Tabla columns={columns} data={tipocombustibleList} />;
};

export default TablaTipoCombustible;
