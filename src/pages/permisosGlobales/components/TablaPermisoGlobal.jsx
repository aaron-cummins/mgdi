import React, { useEffect, useContext, useState } from "react";
import { PermisosGlobalesContext } from "../context/permisosGlobalesContext";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { useSnackbar } from "notistack";

const TablaPermisoGlobal = () => {
  const { permisoGlobalList, obtenerPermisosGlobales, registrarPermisoGlobalList } =
    useContext(PermisosGlobalesContext);
  const { obtenerModulos, obtenerRol, rolesList, modulosList } = useContext(SelectsContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const [checkedState, setCheckedState] = useState([]);

  //const [permisosGlobales, SetPermisosGlobales] = useState([]);

  useEffect(() => {
    obtenerPermisosGlobales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCheckedState([]);

    obtenerModulos();
    obtenerRol();

    return handleCheckbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permisoGlobalList]);

  const handleCheckbox = () => {
    modulosList.forEach((mod) => {
      rolesList.forEach((rol) => {
        let pg = permisoGlobalList.find((item) => (rol.id === item.rolId && mod.id === item.moduloId ? item.id : 0));

        const m = {
          key: `${rol.id}_${mod.id}`,
          id: pg ? pg.id : 0,
          moduloId: mod.id,
          rolId: rol.id,
          activo: !permisoGlobalList.find((item) => rol.id === item.rolId && mod.id === item.moduloId) ? false : true,
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
    registrarPermisoGlobalList(PermisoGlobalAEnviar());

    return obtenerPermisosGlobales();
  };

  const PermisoGlobalAEnviar = () => {
    let PermisoGlobalTmp = [];

    checkedState.forEach((item) => {
      if (item.activo === true) {
        PermisoGlobalTmp.push({
          id: item.id,
          moduloId: item.moduloId,
          rolId: item.rolId,
        });
      }
    });

    return PermisoGlobalTmp;
  };

  return (
    <>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 pl-2 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th width="30%"></th>
              {rolesList.map((item) => (
                <td className="border" key={`${item.id}_r`}>
                  {item.nombre}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {modulosList.map((item) => (
              <tr key={`${item.id}_m_tr`}>
                <td className="border ml-2" key={`${item.id}_m`}>
                  <b>{item.nombre}</b>
                </td>

                {checkedState?.map((i) =>
                  i.moduloId === item.id ? (
                    <td className="text-center border" key={`${item.id}_${i.rolId}`}>
                      <input
                        key={i.key}
                        type="checkbox"
                        id={i.key}
                        name={i.key}
                        value={i.key}
                        onChange={handleChange}
                        //checked={checkedState}
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
          onClick={() => {}}
          className="float-right inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-light-gray hover:bg-light-gray hover:shadow-lg focus:bg-light-gray focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gray active:shadow-lg transition duration-150 ease-in-out">
          Volver
        </button>
        <br />
      </div>
    </>
  );
};

export default TablaPermisoGlobal;
