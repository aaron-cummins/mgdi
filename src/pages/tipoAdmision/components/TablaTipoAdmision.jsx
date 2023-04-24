import React, { useEffect, useContext } from "react";
import { TipoAdmisionContext } from "../context/tipoadmisionContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaTipoAdmision = ({ openModal }) => {
  const { tipoadmisionList, obtenerTipoAdmisiones, obtenerTipoAdmision } = useContext(TipoAdmisionContext);

  const getTipoAdmision = (props) => obtenerTipoAdmision(props).then(openModal());

  useEffect(() => {
    obtenerTipoAdmisiones();
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
        <OpcionesTabla editar={true} FnEditar={() => getTipoAdmision(props)} nombreform="tipoadmision" />
      ),
    },
  ];

  return <Tabla columns={columns} data={tipoadmisionList} />;
};

export default TablaTipoAdmision;
