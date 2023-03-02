import { Filtros, Header, Seccion, Select } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EemmContext } from "../context/eemmContext";
import TablaEemm from "./tablas/TablaEemm";
import ExcelExportHelper from "./ExcelExportHelper";

const IndexEemm = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const {
    eemm,
    setEemm,
    obtenerEemmlist,
    eemmList,
    eemmDefault,
    obtenerEemmEsnlist,
    obtenerEemmUnidadlist,
    obtenerEemmFlotaLugarTrabajolist,
    obtenerEemmLugarTrabajolist,
    obtenerEemmUnidadDatalist,
  } = useContext(EemmContext);
  const {
    obtenerFlotasLugarTrabajo,
    obtenerUnidades,
    limpiarFlotasLugarTrabajo,
    limpiarUnidades,
    lugarTrabajoUsuarioList,
    flotasLugarTrabajoList,
    unidadesList,
  } = useContext(SelectsContext);

  useEffect(() => {
    setEemm(eemmDefault);
    obtenerEemmEsnlist(null);
    obtenerEemmUnidadlist(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const montar = () => {
    navigate("montaje");
  };
  const desmontar = () => {
    navigate("desmontaje");
  };
  const handleChange = (e) => {
    //console.log(e);

    const { name, value } = e.target;

    if (name === "lugarTrabajoId") {
      obtenerFlotasLugarTrabajo(value);
      setEemm({
        ...eemm,
        lugarTrabajo: { id: value },
        flotaLugarTrabajo: { id: 0 },
        flotaLugarTrabajoId: 0,
        unidad: { id: 0 },
        unidadId: 0,
        [name]: value,
      });
      limpiarFlotasLugarTrabajo();
      limpiarUnidades();
    } else if (name === "flotaLugarTrabajoId") {
      obtenerUnidades(value);
      setEemm({ ...eemm, flotaLugarTrabajo: { id: value }, unidad: { id: 0 }, unidadId: 0, [name]: value });
      limpiarUnidades();
    } else if (name === "unidadId") {
      setEemm({ ...eemm, unidad: { id: value }, [name]: value });
    } else setEemm({ ...eemm, [name]: value });
  };

  const handleSearch = (e) => {
    if (eemm.unidadId) {
      obtenerEemmUnidadDatalist(eemm.unidadId);
    } else if (eemm.flotaLugarTrabajoId) {
      obtenerEemmFlotaLugarTrabajolist(eemm.flotaLugarTrabajoId);
    } else if (eemm.lugarTrabajoId) {
      obtenerEemmLugarTrabajolist(eemm.lugarTrabajoId);
    } else {
      obtenerEemmlist();
    }
  };

  return (
    <>
      <Header category="Administración" title="Descargar EEMM">
        <div className="gap-6">
          <button
            type="button"
            style={{
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3 hover:drop-shadow-xl bg-green-dark-cummins hover:bg-green-dark-cummins text-center inline-flex items-center`}
            onClick={montar}>
            Montar
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3 hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}
            onClick={desmontar}>
            Desmontar
          </button>
        </div>
      </Header>
      <Filtros columnas="3" Fn={handleSearch}>
        <div className="form-group">
          <Select
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            label="Lugar Trabajo"
            list={lugarTrabajoUsuarioList}
            value={eemm?.lugarTrabajo?.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <Select
            id="flotaLugarTrabajoId"
            name="flotaLugarTrabajoId"
            placeholder="Flota"
            label="Flota"
            list={flotasLugarTrabajoList}
            value={eemm?.flotaLugarTrabajo?.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <Select
            id="unidadId"
            name="unidadId"
            placeholder="Unidad"
            label="Unidad"
            list={unidadesList}
            value={eemm?.unidad?.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
      </Filtros>
      <Seccion titulo="Descarga Estado motor" visible="true">
        <ExcelExportHelper data={eemmList} />
        {eemmList.length > 0 && <TablaEemm />}
      </Seccion>
    </>
  );
};

export default IndexEemm;
