import React, { useContext } from "react";
import { EemmContext } from "../../context/eemmContext";
import { Tabla } from "components";
import { formatDateshort } from "utilities/Utiles";

const TablaEemm = () => {
  const { eemmList } = useContext(EemmContext);

  const columns = [
    { name: "Faena", selector: (row) => row.flotaLugarTrabajo?.lugarTrabajo?.nombre, sortable: true },
    { name: "Flota", selector: (row) => row.flotaLugarTrabajo?.flotas?.nombre, sortable: true, width: "100px" },
    { name: "Unidad", selector: (row) => row.unidad?.nombre, sortable: true, width: "100px" },
    { name: "ESN [Placa]", selector: (row) => row.esn?.esn, sortable: true },
    { name: "Estado equipo", selector: (row) => row.estadoEquipo?.nombre, sortable: true },
    { name: "Estado motor", selector: (row) => row.estadoMotor?.nombre, sortable: true },
    { name: "Fecha PS", selector: (row) => formatDateshort(row.fechaps), sortable: true },
    { name: "Hr operadas motor", selector: (row) => (row.hrOperadaMotor ? row.hrOperadaMotor : 0.0), sortable: true },
    { name: "Hr Equipo", selector: (row) => (row.hrEquipoInstalacion ? row.hrEquipoInstalacion : 0.0), sortable: true },
    { name: "Fecha falla", selector: (row) => (row.fechaFalla ? formatDateshort(row.fechaFalla) : ""), sortable: true },
  ];

  return <Tabla columns={columns} data={eemmList} pagination={false} />;
};

export default TablaEemm;
