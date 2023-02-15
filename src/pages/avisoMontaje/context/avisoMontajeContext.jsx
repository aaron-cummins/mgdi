import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import avisoMontajeReducer from "../reducer/avisoMontajeReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

import { useStateContext } from "contexts/ContextProvider";

export const AvisoMontajeContext = createContext();

export const AvisoMontajeContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "am";

  const initialState = {
    avisoMontajeList: [],
    avisoMontajeActual: null,
  };

  const [state, dispatch] = useReducer(avisoMontajeReducer, initialState);

  /* OBETENER LISTADO DE Aviso Montaje */
  const obtenerAvisoMontajes = async () => {
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

  /* OBTENER UN AvisoMontaje*/
  const obtenerAvisoMontaje = async (am) => {
    try {
      let amEncontrado = null;
      if (am !== null) {
        const resultado = await callEndpoint(getByID(urlApi, am.id));
        if (resultado && resultado.data) {
          amEncontrado = resultado.data;
        }
      } else {
        amEncontrado = am;
      }

      dispatch({
        type: OBTENER,
        payload: amEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR Aviso Montaje*/
  const registrarAvisoMontaje = async (am) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, am));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Aviso Montaje cread con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Aviso Montaje. ${error}`);
    }
  };

  /* ACTUALIZAR Aviso Montaje */
  const actualizarAvisoMontaje = async (am) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, am));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Aviso Montaje actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Aviso Montaje. ${error}`);
    }
  };

  /* ELIMINAR AvisoMontaje */
  const eliminarAvisoMontaje = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Aviso Montaje eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Aviso Montaje. ${error}`);
    }
  };

  return (
    <AvisoMontajeContext.Provider
      value={{
        avisoMontajeList: state.avisoMontajeList,
        avisoMontajeActual: state.avisoMontajeActual,

        obtenerAvisoMontajes,
        obtenerAvisoMontaje,
        registrarAvisoMontaje,
        actualizarAvisoMontaje,
        eliminarAvisoMontaje,
      }}>
      {props.children}
    </AvisoMontajeContext.Provider>
  );
};
