import React, { useContext } from "react";
import { EemmContext } from "../../context/eemmContext";
import { Tabla } from "components";
import { formatDateshort } from "utilities/Utiles";

const TablaEsn = () => {
  const { eemmEsn } = useContext(EemmContext);

  const columns = [
    { name: "Faena", selector: (row) => row.flotaLugarTrabajo?.lugarTrabajo?.nombre, sortable: true },
    { name: "Flota", selector: (row) => row.flotaLugarTrabajo?.flotas?.nombre, sortable: true },
    { name: "Unidad", selector: (row) => row.unidad?.nombre, sortable: true },
    { name: "ESN [Placa]", selector: (row) => row.esn?.esn, sortable: true },
    { name: "Estado motor", selector: (row) => row.estadoMotor?.nombre, sortable: true },
    { name: "Fecha PS", selector: (row) => formatDateshort(row.fechaps), sortable: true },
    { name: "Hr operadas motor", selector: (row) => (row.hrOperadasMotor ? row.hrOperadasMotor : 0.0), sortable: true },
    { name: "Fecha falla", selector: (row) => (row.fechaFalla ? formatDateshort(row.fechaFalla) : ""), sortable: true },
  ];

  return <Tabla columns={columns} data={eemmEsn} pagination={false} />;
};

export default TablaEsn;
