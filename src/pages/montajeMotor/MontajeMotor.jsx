import React, { useContext, useMemo, useState } from "react";
import {
  Filtros,
  Header,
  Modal,
  SelectEsn,
  SelectFlotaLugarTrabajo,
  SelectLugarTrabajo,
  SelectUnidad,
} from "components";
import { MontajeMotorContextProvider } from "./context/montajeMotorContext";
import { SelectsContext } from "contexts/SelectsContext";

import { TbEngine } from "react-icons/tb";
import { GiMineTruck } from "react-icons/gi";

import FormMontajeMotor from "./components/FormMontajeMotor";
import TablaMontajeMotor from "./components/TablaMontajeMotor";

const MontajeMotor = () => {
  const { obtenerFlotasLugarTrabajo, obtenerUnidades, obtenerEsn } = useContext(SelectsContext);
  const montajeMotorDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      lugarTrabajoId: 0,
      flotaLugarTrabajoId: 0,
      flotaLugarTrabajo: {
        id: 0,
      },
      unidadId: 0,
      unidad: {
        id: 0,
      },
      esnId: 0,
      esn: {
        id: 0,
      },
      activo: false,
    }),
    []
  );

  const [montajeMotor, setMontajeMotor] = useState(montajeMotorDefault);

  const handleChange = (e) => {
    if (e.target.name === "lugarTrabajoId") {
      obtenerFlotasLugarTrabajo(e.target.value);
      setMontajeMotor({ ...montajeMotor, unidad: { id: 0 }, [e.target.name]: e.target.value });
    } else if (e.target.name === "flotaLugarTrabajoId") {
      obtenerUnidades(e.target.value);
      setMontajeMotor({ ...montajeMotor, flotaLugarTrabajo: { id: e.target.value }, [e.target.name]: e.target.value });
    } else if (e.target.name === "unidadId") {
      obtenerEsn();
      setMontajeMotor({ ...montajeMotor, unidad: { id: e.target.value }, [e.target.name]: e.target.value });
    } else if (e.target.name === "esnId") {
      setMontajeMotor({ ...montajeMotor, esn: { id: e.target.value }, [e.target.name]: e.target.value });
    } else setMontajeMotor({ ...montajeMotor, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    alert("prueba");
  };

  return (
    <MontajeMotorContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Montaje Motor" />

        <Filtros Fn={handleSearch}>
          <div className="form-group">
            <SelectLugarTrabajo
              id="lugarTrabajoId"
              name="lugarTrabajoId"
              placeholder="Lugar Trabajo"
              value={montajeMotor.flotaLugarTrabajo.lugarTrabajo?.id}
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </div>
          <div className="form-group">
            <SelectFlotaLugarTrabajo
              id="flotaLugarTrabajoId"
              name="flotaLugarTrabajoId"
              placeholder="Flota"
              value={montajeMotor.flotaLugarTrabajo?.id}
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </div>
          <div className="form-group">
            <SelectUnidad
              id="unidadId"
              name="unidadId"
              placeholder="Unidad"
              value={montajeMotor.unidad.id}
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </div>

          <div className="form-group">
            <SelectEsn
              id="esnId"
              name="esnId"
              placeholder="ESN"
              value={montajeMotor.esn.id}
              onChange={(e) => handleChange(e)}
              required={true}
            />
          </div>
        </Filtros>

        <div className="mb-5 border-solid border-1">
          <div className="flex justify-between items-center gap-2 mb-1 pl-2 pr-2 bg-gray-50 ">
            <p className="text-lg text-gray-00">Historial de la unidad </p>
            <p>
              <GiMineTruck />
            </p>
          </div>
          <div className="justify-between items-center mb-2 mt-1 pl-2 pr-2 grid grid-cols-3 gap-4"></div>
        </div>

        <div className="mb-5 border-solid border-1">
          <div className="flex justify-between items-center gap-2 mb-1 pl-2 pr-2 bg-gray-50 ">
            <p className="text-lg text-gray-00">Historial ESN </p>
            <p>
              <TbEngine />
            </p>
          </div>
          <div className="justify-between items-center mb-2 mt-1 pl-2 pr-2 grid grid-cols-3 gap-4"></div>
        </div>

        <TablaMontajeMotor />

        <Modal ModalTitle="MontajeMotor" modalId="montajemotor-modal">
          <FormMontajeMotor />
        </Modal>
      </div>
    </MontajeMotorContextProvider>
  );
};

export default MontajeMotor;
