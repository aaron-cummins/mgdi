import React, { createContext, useReducer, useState } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import ConversionUnidadReducer from "../reducer/ConversionUnidadReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const ConversionUnidadContext = createContext();

export const ConversionUnidadContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();

  const urlApi = "conversionunidad";

  const initialState = {
    ConversionUnidadList: [],
    ConversionUnidadActual: null,

    conversionFlotaList: [],
    unidadList: [],
  };

  const [state, dispatch] = useReducer(ConversionUnidadReducer, initialState);
  const [mensaje, SetMensaje] = useState(null);
  const [tipoAlerta, SetTipoAlerta] = useState(null);

  /* OBETENER LISTADO DE CONVERSION UNIDAD */
  const obtenerConversionUnidades = async () => {
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

  /* OBTENER UNA CONVERSION UNIDAD */
  const obtenerConversionUnidad = async (ConversionUnidad) => {
    try {
      let ConversionUnidadEncontrada = null;
      if (ConversionUnidad !== null) {
        const resultado = await callEndpoint(getByID(urlApi, ConversionUnidad.id));
        if (resultado && resultado.data) {
          ConversionUnidadEncontrada = resultado.data;
        }
      } else {
        ConversionUnidadEncontrada = ConversionUnidad;
      }

      dispatch({
        type: OBTENER,
        payload: ConversionUnidadEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR CONVERSION UNIDAD */
  const registrarConversionUnidad = async (ConversionUnidad) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, ConversionUnidad));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversión unidad creada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar crear la Conversión unidad. ${error}` })
      );
    }
  };

  /* ACTUALIZAR CONVERSION UNIDAD */
  const actualizarConversionUnidad = async (ConversionUnidad) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, ConversionUnidad));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversión unidad actualizada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar actualizar la Conversión unidad. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR Conversion unidad */
  const eliminarConversionUnidad = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversión unidad eliminada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar eliminar la Conversión unidad. ${error}`,
        })
      );
    }
  };

  return (
    <ConversionUnidadContext.Provider
      value={{
        ConversionUnidadList: state.ConversionUnidadList,
        ConversionUnidadActual: state.ConversionUnidadActual,

        conversionFlotaList: state.conversionFlotaList,
        unidadList: state.unidadList,

        obtenerConversionUnidades,
        obtenerConversionUnidad,
        registrarConversionUnidad,
        actualizarConversionUnidad,
        eliminarConversionUnidad,

        mensaje,
        SetMensaje,
        tipoAlerta,
        SetTipoAlerta,
      }}>
      {props.children}
    </ConversionUnidadContext.Provider>
  );
};
