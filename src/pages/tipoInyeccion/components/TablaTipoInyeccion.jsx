import React, { useEffect, useContext } from "react";
import { TipoInyeccionContext } from "../context/tipoinyeccionContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaTipoInyeccion = () => {
  const { tipoinyeccionList, obtenerTipoInyecciones, obtenerTipoInyeccion } = useContext(TipoInyeccionContext);

  const getTipoInyeccion = (props) => obtenerTipoInyeccion(props);

  useEffect(() => {
    obtenerTipoInyecciones();
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
        <OpcionesTabla editar={true} FnEditar={() => getTipoInyeccion(props)} nombreform="tipoinyeccion" />
      ),
    },
  ];

  return <Tabla columns={columns} data={tipoinyeccionList} />;
};

export default TablaTipoInyeccion;
