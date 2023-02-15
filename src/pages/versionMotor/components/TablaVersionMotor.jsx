import React, { useEffect, useContext } from "react";
import { VersionMotorContext } from "../context/versionMotorContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaVersionMotor = () => {
  const { versionmotorList, obtenerVersionMotores, obtenerVersionMotor } = useContext(VersionMotorContext);
  const {
    obtenerMotores,
    obtenerModuloControl,
    obtenerTipoAdmision,
    obtenerTipoBlock,
    obtenerTipoCombustible,
    obtenerTipoEmision,
    obtenerTipoFiltrado,
    obtenerTipoInyeccion,
    obtenerPostTratamiento,
  } = useContext(SelectsContext);

  const getVersionMotor = (props) => obtenerVersionMotor(props);

  useEffect(() => {
    obtenerVersionMotores();
    obtenerMotores();
    obtenerModuloControl();
    obtenerTipoAdmision();
    obtenerTipoBlock();
    obtenerTipoCombustible();
    obtenerTipoEmision();
    obtenerTipoFiltrado();
    obtenerTipoInyeccion();
    obtenerPostTratamiento();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nom. Comercial", selector: (row) => row.nombreComercial, sortable: true },
    { name: "Nom. Servicio", selector: (row) => row.nombreServicio, sortable: true },
    { name: "Filtrado", selector: (row) => row.tipoFiltrado?.nombre, sortable: true },
    { name: "Inyección", selector: (row) => row.tipoInyeccion?.nombre, sortable: true },
    { name: "Admisión", selector: (row) => row.tipoAdmision?.nombre, sortable: true },
    { name: "Emisión", selector: (row) => row.tipoEmision?.nombre, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla editar={true} FnEditar={() => getVersionMotor(props)} nombreform="versionmotor" />
      ),
    },
  ];

  return <Tabla columns={columns} data={versionmotorList} />;
};

export default TablaVersionMotor;
