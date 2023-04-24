import React, { useEffect, useContext, useState } from "react";
import { UsuarioContext } from "../context/usuarioContext";
import { ColActivoTabla, Filtros, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import { useNavigate } from "react-router-dom";

const TablaUsuario = ({ openModal }) => {
  const { usuarioList, obtenerUsuariolist, obtenerUsuario, obtenerPermisosUsuariolist } = useContext(UsuarioContext);
  const { obtenerCargos, obtenerRol } = useContext(SelectsContext);
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const inputsClass =
    "form-control block w-full px-3 py-1.5 border border-solid rounded border-gray-300 text-gray-600 pl-1";
  const labelClass = "text-sm text-gray-600";

  const getUsuario = (props) => obtenerUsuario(props).then(openModal());
  const getUsuarioPermisos = (props) => {
    obtenerPermisosUsuariolist(props.id);
    obtenerUsuario(props);
    let ruta = `permisosusuario/${props.id}`;
    navigate(ruta);
  };

  useEffect(() => {
    obtenerUsuariolist();
    obtenerCargos();
    obtenerRol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilterData(usuarioList);
  }, [usuarioList]);

  const onChangefilter = (e) => {
    if (e.target.name === "nombres") {
      let filtro = usuarioList.filter(
        (item) => item.nombres && item.nombres.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterData(filtro);
    }

    if (e.target.name === "rut") {
      let filtro = usuarioList.filter(
        (item) => item.rut && item.rut.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterData(filtro);
    }

    if (e.target.name === "uid") {
      let filtro = usuarioList.filter(
        (item) => item.uid && item.uid.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterData(filtro);
    }
  };

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "Nombre",
      selector: (row) => row.nombres + " " + row.apellidos,
      sortable: true,
    },
    { name: "Rut", selector: (row) => row.rut },
    { name: "Uid", selector: (row) => row.uid },
    { name: "Cargo", selector: (row) => row.cargo.nombre },
    { name: "Correo", selector: (row) => row.correo },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <>
          <OpcionesTabla editar={true} FnEditar={() => getUsuario(props)} nombreform="usuario" />
          <OpcionesTabla info={true} tooltip="Permisos" FnInfo={() => getUsuarioPermisos(props)} nombreform="usuario" />
        </>
      ),
    },
  ];

  return (
    <>
      <Filtros columnas="3">
        <div className="form-group">
          <label className={labelClass}>Nombre</label>
          <input className={inputsClass} id="nombre" name="nombres" onChange={(e) => onChangefilter(e)} />
        </div>
        <div className="form-group">
          <label className={labelClass}>Rut</label>
          <input className={inputsClass} id="rut" name="rut" label="rut" onChange={(e) => onChangefilter(e)} />
        </div>
        <div className="form-group">
          <label className={labelClass}>Uid</label>
          <input className={inputsClass} id="uid" name="uid" label="Uid" onChange={(e) => onChangefilter(e)} />
        </div>
      </Filtros>

      <Tabla columns={columns} data={filterData} title={"Listado de usuarios"} />
    </>
  );
};

export default TablaUsuario;
