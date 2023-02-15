import React, { useContext, useEffect } from "react";
import { ConversionUnidadContext } from "../context/ConversionUnidadContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaConversionUnidad = () => {
  const { ConversionUnidadList, obtenerConversionUnidades, obtenerConversionUnidad } =
    useContext(ConversionUnidadContext);

  const { obtenerConversionFlota, obtenerUnidades } = useContext(SelectsContext);

  const getConversionUnidad = (props) => obtenerConversionUnidad(props);

  useEffect(() => {
    obtenerConversionUnidades();
    obtenerConversionFlota();
    obtenerUnidades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Conversion flotas", selector: (row) => row.conversionFlotas?.nombre, sortable: true },
    { name: "Unidad", selector: (row) => row.unidad?.nombre, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla editar={true} FnEditar={() => getConversionUnidad(props)} nombreform="conversionunidad" />
      ),
    },
  ];

  return <Tabla data={ConversionUnidadList} columns={columns} />;
};

export default TablaConversionUnidad;
