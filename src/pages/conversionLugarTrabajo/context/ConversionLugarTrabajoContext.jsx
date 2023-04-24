import React, { createContext, useReducer, useState } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import ConversionLugarTrabajoReducer from "../reducer/ConversionLugarTrabajoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const ConversionLugarTrabajoContext = createContext();

export const ConversionLugarTrabajoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "conversionlugartrabajo";

  const initialState = {
    ConversionLugarTrabajoList: [],
    ConversionLugarTrabajoActual: null,

    fuenteInformacionList: [],
    lugarTrabajoList: [],
  };

  const [state, dispatch] = useReducer(ConversionLugarTrabajoReducer, initialState);
  const [mensaje, SetMensaje] = useState(null);
  const [tipoAlerta, SetTipoAlerta] = useState(null);

  /* OBETENER LISTADO DE CONVERSION LUGAR TRABAJO */
  const obtenerConversionLugarTrabajos = async () => {
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

  /* OBTENER UNA CONVERSION LUGAR TRABAJO */
  const obtenerConversionLugarTrabajo = async (ConversionLugarTrabajo) => {
    try {
      let ConversionLugarTrabajoEncontrada = null;
      if (ConversionLugarTrabajo !== null) {
        const resultado = await callEndpoint(getByID(urlApi, ConversionLugarTrabajo.id));
        if (resultado && resultado.data) {
          ConversionLugarTrabajoEncontrada = resultado.data;
        }
      } else {
        ConversionLugarTrabajoEncontrada = ConversionLugarTrabajo;
      }

      dispatch({
        type: OBTENER,
        payload: ConversionLugarTrabajoEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR CONVERSION LUGAR TRABAJO */
  const registrarConversionLugarTrabajo = async (ConversionLugarTrabajo) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, ConversionLugarTrabajo));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversion lugar de trabajo creada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar crear la Conversion lugar de trabajo. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR Conversion Lugar Trabajo */
  const actualizarConversionLugarTrabajo = async (ConversionLugarTrabajo) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, ConversionLugarTrabajo));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversion lugar de Trabajo actualizada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar actualizar la Conversion lugar de trabajo. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR Conversion Lugar Trabajo */
  const eliminarConversionLugarTrabajo = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversion lugar de trabajo eliminada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar eliminar la Conversion lugar de trabajo. ${error}`,
        })
      );
    }
  };

  return (
    <ConversionLugarTrabajoContext.Provider
      value={{
        ConversionLugarTrabajoList: state.ConversionLugarTrabajoList,
        ConversionLugarTrabajoActual: state.ConversionLugarTrabajoActual,

        fuenteInformacionList: state.fuenteInformacionList,
        lugarTrabajoList: state.lugarTrabajoList,

        obtenerConversionLugarTrabajos,
        obtenerConversionLugarTrabajo,
        registrarConversionLugarTrabajo,
        actualizarConversionLugarTrabajo,
        eliminarConversionLugarTrabajo,

        mensaje,
        SetMensaje,
        tipoAlerta,
        SetTipoAlerta,
      }}>
      {props.children}
    </ConversionLugarTrabajoContext.Provider>
  );
};
