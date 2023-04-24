import { Filtros, Header, Seccion, Select } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import React, { useContext } from "react";
import { EemmFaenaHorometroContext } from "../context/eemmFaenaHorometroContext";
import HrCabina from "./HrCabina";

import { read, utils } from "xlsx";

const IndexEmmFaenaHorometro = () => {
  const {
    lugarTrabajoUsuarioList,
    unidadesList,
    obtenerFlotasLugarTrabajo,
    obtenerUnidades,
    limpiarUnidades,
    limpiarFlotasLugarTrabajo,
  } = useContext(SelectsContext);
  const { eemmFaenaHorometro, setEemmFaenaHorometro } = useContext(EemmFaenaHorometroContext);

  //const [emmfaena, setEmmfaena] = useState([]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "lugarTrabajoId") {
      obtenerFlotasLugarTrabajo(value);
      setEemmFaenaHorometro({
        ...eemmFaenaHorometro,
        lugarTrabajo: { id: value },
        flotaLugarTrabajo: { id: 0 },
        flotaLugarTrabajoId: 0,
        unidad: { id: 0 },
        unidadId: 0,
        [name]: value,
      });
      limpiarFlotasLugarTrabajo();
    } else if (name === "flotaLugarTrabajoId") {
      obtenerUnidades(value);
      setEemmFaenaHorometro({
        ...eemmFaenaHorometro,
        flotaLugarTrabajo: { id: value },
        unidad: { id: 0 },
        unidadId: 0,
        [name]: value,
      });
      limpiarUnidades();
    }

    if (name === "file") {
      const f = await files[0].arrayBuffer();
      const wb = read(f);
      const ws = wb.Sheets["Control horometros"];

      const data = utils.sheet_to_json(ws);
      //console.log(data);

      data.forEach((item) => console.log(item));

      /*const path_file = window.URL.createObjectURL(f);
      console.log(path_file);
      const workbook = readFile(f.name);
      console.log(workbook.Sheets["Modelo"]);*/
    }
  };

  const handleSearch = () => {
    if (eemmFaenaHorometro.flotaLugarTrabajoId) {
      //obtenerEemmFlotaLugarTrabajolist(eemmFaenaHorometro.flotaLugarTrabajoId);
      obtenerUnidades(eemmFaenaHorometro.flotaLugarTrabajoId);
    } else if (eemmFaenaHorometro.lugarTrabajoId) {
      //obtenerEemmLugarTrabajolist(eemmFaenaHorometro.lugarTrabajoId);
      alert(`falta la flota`);
    } else {
      //obtenerEemmlist();
    }
  };

  return (
    <>
      <Header category="Administración / Control de horómetros" title="EEMM Faena" />
      <Filtros columnas="2" Fn={handleSearch}>
        <div className="form-group">
          <Select
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            label="Lugar Trabajo"
            list={lugarTrabajoUsuarioList}
            value={eemmFaenaHorometro?.lugarTrabajo?.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <input type="file" name="file" id="file" onChange={(e) => handleChange(e)} />
        </div>
      </Filtros>
      <Seccion titulo="Horometros de cabina " visible="true">
        <HrCabina unidades={unidadesList} />
      </Seccion>
      <Seccion titulo="Horometros de motor " visible="true"></Seccion>
    </>
  );
};

export default IndexEmmFaenaHorometro;
