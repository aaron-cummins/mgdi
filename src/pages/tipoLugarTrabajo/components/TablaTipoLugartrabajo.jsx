import React, { useEffect, useContext } from "react";
import { TipolugartrabajoContext } from "../context/tipolugartrabajoContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaTipolugarTrabajo = ({ openModal }) => {
  const { tipolugartrabajoList, obtenerTipolugartrabajoList, obtenerTipolugartrabajo } =
    useContext(TipolugartrabajoContext);

  const getTipolugartrabajo = (props) => obtenerTipolugartrabajo(props).then(openModal());

  useEffect(() => {
    obtenerTipolugartrabajoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Tipo", selector: (row) => row.tipo, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla editar={true} FnEditar={() => getTipolugartrabajo(props)} nombreform="tipolugartrabajo" />
      ),
    },
  ];

  return <Tabla columns={columns} data={tipolugartrabajoList} />;
};

export default TablaTipolugarTrabajo;
