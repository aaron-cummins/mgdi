import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import tipolugartrabajoReducer from "../reducer/tipolugartrabajoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const TipolugartrabajoContext = createContext();

export const TipolugartrabajoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "tipolugartrabajo";

  const initialState = {
    tipolugartrabajoList: [],
    tipolugartrabajoActual: null,
  };

  const [state, dispatch] = useReducer(tipolugartrabajoReducer, initialState);

  /* OBETENER LISTADO DE TIPOLUGARTRABAJOS */
  const obtenerTipolugartrabajoList = async () => {
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

  /* OBTENER UN TIPOLUGARTRABAJO */
  const obtenerTipolugartrabajo = async (tipolugartrabajo) => {
    try {
      let tipolugartrabajoEncontrado = null;
      if (tipolugartrabajo !== null) {
        const resultado = await callEndpoint(getByID(urlApi, tipolugartrabajo.id));
        if (resultado && resultado.data) {
          tipolugartrabajoEncontrado = resultado.data;
        }
      } else {
        tipolugartrabajoEncontrado = tipolugartrabajo;
      }

      dispatch({
        type: OBTENER,
        payload: tipolugartrabajoEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPOLUGARTRABAJO */
  const registrarTipolugartrabajo = async (tipolugartrabajo) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, tipolugartrabajo));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Tipo lugar de trabajo creado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear el tipo lugar de trabajo. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR TIPOLUGARTRABAJO */
  const actualizarTipolugartrabajo = async (tipolugartrabajo) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, tipolugartrabajo));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Tipo lugar de trabajo actualizado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar el tipo lugar de trabajo. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR TIPOLUGARTRABAJO */
  const eliminarTipolugartrabajo = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Tipo lugar de trabajo eliminado con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar el tipo lugar de trabajo. ${error}`,
        })
      );
    }
  };

  return (
    <TipolugartrabajoContext.Provider
      value={{
        tipolugartrabajoList: state.tipolugartrabajoList,
        tipolugartrabajoActual: state.tipolugartrabajoActual,

        obtenerTipolugartrabajoList,
        obtenerTipolugartrabajo,
        registrarTipolugartrabajo,
        actualizarTipolugartrabajo,
        eliminarTipolugartrabajo,
      }}>
      {props.children}
    </TipolugartrabajoContext.Provider>
  );
};
