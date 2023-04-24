import React, { useEffect, useContext } from "react";
import { FuenteInformacionContext } from "../context/FuenteInformacionContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaFuenteInformacion = ({ openModal }) => {
  const { FuenteInformacionList, obtenerFuenteInformacion, obtenerFuenteInformaciones } =
    useContext(FuenteInformacionContext);

  const getFuenteInformacion = (props) => {
    obtenerFuenteInformacion(props).then(openModal());
  };

  useEffect(() => {
    obtenerFuenteInformaciones();
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
        <OpcionesTabla editar={true} FnEditar={() => getFuenteInformacion(props)} nombreform="fuenteinformacion" />
      ),
    },
  ];

  return <Tabla columns={columns} data={FuenteInformacionList} />;
};

export default TablaFuenteInformacion;
