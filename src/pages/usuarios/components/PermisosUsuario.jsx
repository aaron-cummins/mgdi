import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import { UsuarioContext } from "../context/usuarioContext";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";

const PermisosUsuario = () => {
  const { lugarTrabajoList, rolesList, obtenerRol } = useContext(SelectsContext);
  const {
    obtenerUsuario,
    usuarioActual,
    registrarPermisosUsuario,
    eliminarPermisosUsuario,
    usuarioPermisosList,
    obtenerPermisosUsuariolist,
  } = useContext(UsuarioContext);
  const { enqueueSnackbar } = useSnackbar();

  const [checkedState, setCheckedState] = useState([]);
  const { mensaje } = useStateContext();
  const parametro = useParams("iduser");

  const navigate = useNavigate();
  const volver = (props) => {
    setCheckedState([]);
    obtenerPermisosUsuariolist(null);
    navigate("/usuarios");
  };
  useEffect(() => {
    obtenerPermisosUsuariolist(parametro.iduser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCheckedState([]);
    const usuario = [];
    usuario.id = parametro.iduser;
    //obtenerPermisosUsuariolist(parametro.iduser);
    obtenerUsuario(usuario);
    obtenerRol();

    return handleCheckbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioPermisosList]);

  const handleCheckbox = () => {
    lugarTrabajoList.forEach((lt) => {
      rolesList.forEach((rol) => {
        const m = {
          key: `${rol.id}_${lt.id}`,
          id: 0,
          lugarTrabajoId: lt.id,
          usuarioId: parametro.iduser,
          rolId: rol.id,
          activo: !usuarioPermisosList?.find((item) => rol.id === item.rolId && lt.id === item.lugarTrabajoId)
            ? false
            : true,
        };
        setCheckedState((checkedState) => [...checkedState, m]);
      });
    });
  };

  const handleChange = (e) => {
    let c = checkedState.find((item) => item.key === e.target.id);
    c.activo = !c.activo;
    setCheckedState(checkedState.map((item) => (item.key === e.target.id ? c : item)));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let permisos = PermisosAEnviar();
    if (permisos !== null) {
      eliminarPermisosUsuario(parametro.iduser);
      registrarPermisosUsuario(permisos);
    } else enqueueSnackbar("ocurrio un error al intentar gurdar los permisos.", { variant: "error" });
  };

  const PermisosAEnviar = () => {
    let PermisoTmp = [];

    checkedState.forEach((item) => {
      if (item.activo === true) {
        console.log(item);
        PermisoTmp.push({
          id: 0,
          lugarTrabajoId: item.lugarTrabajoId,
          usuarioId: item.usuarioId,
          rolId: item.rolId,
        });
      }
    });
    return PermisoTmp;
  };

  return (
    <>
      <Header category="Administración" title="Permisos Usuario" />
      <div>
        <p className="text-md font-semibold text-gray-600">{`${usuarioActual?.nombres} ${usuarioActual?.apellidos}`}</p>
        <div className="flex-grow border-t"></div>
        <br />
      </div>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 pl-2 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center" key={"titulo"}>
              <th width="30%"></th>
              {rolesList.map((item) => (
                <td className="border" key={`${item.id}_rl`}>
                  {item.nombre}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {lugarTrabajoList.map((item) => (
              <tr key={`${item.id}_m_tr`}>
                <td className="border ml-2" key={`${item.id}_lt`}>
                  <b>{item.nombre}</b>
                </td>

                {checkedState?.map((i) =>
                  i.lugarTrabajoId === item.id ? (
                    <td className="text-center border" key={`${item.id}_${i.id}_${i.key}`}>
                      <input
                        key={i.key}
                        type="checkbox"
                        id={i.key}
                        name={i.key}
                        value={i.key}
                        onChange={handleChange}
                        checked={i.activo}
                      />
                    </td>
                  ) : null
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <br />
        <div className="flex-grow border-t"></div>
        <br />

        <button
          type="button"
          onClick={handleOnSubmit}
          className="float-right inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-red-cummins hover:bg-red-cummins hover:shadow-lg focus:bg-red-cummins focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-cummins active:shadow-lg transition duration-150 ease-in-out ml-1">
          Guardar
        </button>

        <button
          type="button"
          onClick={volver}
          className="float-right inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-light-gray hover:bg-light-gray hover:shadow-lg focus:bg-light-gray focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gray active:shadow-lg transition duration-150 ease-in-out">
          Volver
        </button>
        <br />
      </div>
    </>
  );
};

export default PermisosUsuario;
