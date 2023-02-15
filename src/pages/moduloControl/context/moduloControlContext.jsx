import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import modulocontrolReducer from "../reducer/moduloControlReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const ModuloControlContext = createContext();

export const ModuloControlContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "modulocontrol";

  const initialState = {
    modulocontrolList: [],
    modulocontrolActual: null,
  };

  const [state, dispatch] = useReducer(modulocontrolReducer, initialState);

  /* OBETENER LISTADO DE MODULOCONTROLS */
  const obtenerModulosControl = async () => {
    try {
      const resultado = await callEndpoint(getList(urlApi));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER UNA MODULOCONTROL */
  const obtenerModuloControl = async (modulocontrol) => {
    try {
      let modulocontrolEncontrada = null;
      if (modulocontrol !== null) {
        const resultado = await callEndpoint(getByID(urlApi, modulocontrol.id));
        if (resultado && resultado.data) {
          modulocontrolEncontrada = resultado.data;
        }
      } else {
        modulocontrolEncontrada = modulocontrol;
      }

      dispatch({
        type: OBTENER,
        payload: modulocontrolEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR MODULOCONTROL */
  const registrarModuloControl = async (modulocontrol) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, modulocontrol));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Módulo Control creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Módulo control. ${error}`);
    }
  };

  /* ACTUALIZAR MODULOCONTROL */
  const actualizarModuloControl = async (modulocontrol) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, modulocontrol));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Módulo Control actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Módulo control. ${error}`);
    }
  };

  /* ELIMINAR MODULOCONTROL */
  const eliminarModuloControl = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Módulo Control eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Módulo control. ${error}`);
    }
  };

  return (
    <ModuloControlContext.Provider
      value={{
        modulocontrolList: state.modulocontrolList,
        modulocontrolActual: state.modulocontrolActual,

        obtenerModulosControl,
        obtenerModuloControl,
        registrarModuloControl,
        actualizarModuloControl,
        eliminarModuloControl,
      }}>
      {props.children}
    </ModuloControlContext.Provider>
  );
};
