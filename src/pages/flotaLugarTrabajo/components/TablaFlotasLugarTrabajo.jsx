import React, { useEffect, useContext, useState } from "react";
import { FlotaLugarTrabajoContext } from "../context/flotaLugarTrabajoContext";
import { ColActivoTabla, OpcionesTabla, Seccion, Select, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaFlotasLugarTrabajo = () => {
  const { flotaLugarTrabajoList, obtenerFlotasLugarTrabajoList, obtenerFlotaLugarTrabajo } =
    useContext(FlotaLugarTrabajoContext);

  const [filterData, setFilterData] = useState([]);
  const [filtros, setFiltros] = useState({ lt: 0, fl: 0, st: 0 });

  const inputsClass =
    "form-control block w-full px-3 py-1.5 border border-solid rounded border-gray-300 text-gray-600 pl-1";
  const labelClass = "text-sm text-gray-600";
  const {
    obtenerFlotas,
    obtenerFlotasLugarTrabajo,
    obtenerLugaresTrabajoUsuario,
    lugarTrabajoUsuarioList,
    flotasLugarTrabajoList,
  } = useContext(SelectsContext);

  const getFlota = (props) => obtenerFlotaLugarTrabajo(props);

  useEffect(() => {
    obtenerLugaresTrabajoUsuario();

    obtenerFlotasLugarTrabajoList();
    obtenerFlotas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilterData(flotaLugarTrabajoList);
  }, [flotaLugarTrabajoList]);

  const onChangefilter = (e) => {
    console.log(e);
    const { name, value } = e.target;
    let filtro;
    setFiltros({ ...filtros, [name]: value });

    switch (name) {
      case "lt": {
        if (value !== 0) {
          obtenerFlotasLugarTrabajo(0);
          filtro = flotaLugarTrabajoList.filter((item) => item.lugarTrabajo && item.lugarTrabajo?.id === value);
          setFilterData(filtro);
          obtenerFlotasLugarTrabajo(value);
        } else setFilterData(flotaLugarTrabajoList);
        break;
      }
      case "fl": {
        if (value !== 0) {
          filtro = filterData.filter((item) => item.id === value);
          setFilterData(filtro);
        } else setFilterData(flotaLugarTrabajoList);
        break;
      }
      case "st": {
        if (value !== "Todos") {
          if (value === "false") filtro = flotaLugarTrabajoList.filter((item) => !item.activo);
          if (value === "true") filtro = flotaLugarTrabajoList.filter((item) => item.activo);
          setFilterData(filtro);
        } else setFilterData(flotaLugarTrabajoList);
        break;
      }
      default:
        setFilterData(flotaLugarTrabajoList);
    }
  };

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "Lugar Trabajo",
      selector: (row) => row.lugarTrabajo?.nombre,
      sortable: true,
    },
    { name: "Flota", selector: (row) => row.flotas?.nombre, sortable: true },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getFlota(props)} nombreform="flotalugartrabajo" />,
    },
  ];

  return (
    <>
      <Seccion titulo="Filtros" visible={true}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="form-group">
            <Select
              id="lt"
              name="lt"
              label="Lugar Trabajo"
              list={lugarTrabajoUsuarioList}
              onChange={(e) => onChangefilter(e)}
              value={filtros.lt}
            />
          </div>

          <div className="form-group">
            <Select
              id="fl"
              name="fl"
              label="Flota"
              list={flotasLugarTrabajoList}
              onChange={(e) => onChangefilter(e)}
              value={filtros.fl}
            />
          </div>
          <div className="form-group">
            <label className={labelClass}>Estado</label>
            <select className={inputsClass} id="st" name="st" onChange={(e) => onChangefilter(e)}>
              <option>Todos</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
          </div>
        </div>
      </Seccion>
      <Tabla columns={columns} data={filterData} title={"Listado de flotas"} />
    </>
  );
};

export default TablaFlotasLugarTrabajo;
