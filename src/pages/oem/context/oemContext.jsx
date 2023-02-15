import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import oemReducer from "../reducer/oemReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const OemContext = createContext();

export const OemContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "oem";

  const initialState = {
    oemList: [],
    oemActual: null,
  };

  const [state, dispatch] = useReducer(oemReducer, initialState);

  /* OBETENER LISTADO DE OEMS */
  const obtenerOems = async () => {
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

  /* OBTENER UNA OEM */
  const obtenerOem = async (oem) => {
    try {
      let oemEncontrada = null;
      if (oem !== null) {
        const resultado = await callEndpoint(getByID(urlApi, oem.id));
        if (resultado && resultado.data) {
          oemEncontrada = resultado.data;
        }
      } else {
        oemEncontrada = oem;
      }

      dispatch({
        type: OBTENER,
        payload: oemEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR OEM */
  const registrarOem = async (oem) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, oem));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Oem creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el oem. ${error}`);
    }
  };

  /* ACTUALIZAR OEM */
  const actualizarOem = async (oem) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, oem));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Oem actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el oem. ${error}`);
    }
  };

  /* ELIMINAR OEM */
  const eliminarOem = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Oem eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el oem. ${error}`);
    }
  };

  return (
    <OemContext.Provider
      value={{
        oemList: state.oemList,
        oemActual: state.oemActual,

        obtenerOems,
        obtenerOem,
        registrarOem,
        actualizarOem,
        eliminarOem,
      }}>
      {props.children}
    </OemContext.Provider>
  );
};
