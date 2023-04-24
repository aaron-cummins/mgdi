import React, { useContext, useEffect } from "react";
import { ConversionFlotasContext } from "../context/ConversionFlotasContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaConversionFlotas = ({ openModal }) => {
  const { ConversionFlotasList, obtenerConversionesFlotas, obtenerConversionFlotas } =
    useContext(ConversionFlotasContext);

  const { obtenerFlotas, obtenerFuenteInformacion, obtenerConversionLugarTrabajo } = useContext(SelectsContext);

  const getConversionFlotas = (props) => {
    obtenerConversionFlotas(props).then(openModal());
  };

  useEffect(() => {
    obtenerConversionesFlotas();
    obtenerFuenteInformacion();
    obtenerFlotas();
    obtenerConversionLugarTrabajo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Abreviación", selector: (row) => row.abreviacion, sortable: true },
    { name: "Flota", selector: (row) => row.flotas?.nombre, sortable: true },
    { name: "Fuente Información", selector: (row) => row.fuenteInformacion?.nombre, sortable: true },
    { name: "Conversión Lugar trabajo", selector: (row) => row.conversionLugarTrabajo?.nombre, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla editar={true} FnEditar={() => getConversionFlotas(props)} nombreform="conversionflotas" />
      ),
    },
  ];

  return <Tabla data={ConversionFlotasList} columns={columns} />;
};

export default TablaConversionFlotas;
