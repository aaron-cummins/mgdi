import React, { createContext, useReducer, useState } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import ConversionFlotasReducer from "../reducer/ConversionFlotasReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const ConversionFlotasContext = createContext();

export const ConversionFlotasContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "conversionflotas";

  const initialState = {
    ConversionFlotasList: [],
    ConversionFlotasActual: null,

    flotaList: [],
    fuenteInformacionList: [],
    conversionLugarTrabajoList: [],
  };

  const [state, dispatch] = useReducer(ConversionFlotasReducer, initialState);
  const [mensaje, SetMensaje] = useState(null);
  const [tipoAlerta, SetTipoAlerta] = useState(null);

  /* OBETENER LISTADO DE Conversion FlotasS */
  const obtenerConversionesFlotas = async () => {
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

  /* OBTENER UNA Conversion Flotas */
  const obtenerConversionFlotas = async (ConversionFlotas) => {
    try {
      let ConversionFlotasEncontrada = null;
      if (ConversionFlotas !== null) {
        const resultado = await callEndpoint(getByID(urlApi, ConversionFlotas.id));
        if (resultado && resultado.data) {
          ConversionFlotasEncontrada = resultado.data;
        }
      } else {
        ConversionFlotasEncontrada = ConversionFlotas;
      }

      dispatch({
        type: OBTENER,
        payload: ConversionFlotasEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR Conversion Flotas */
  const registrarConversionFlotas = async (ConversionFlotas) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, ConversionFlotas));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversion Flotas creada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear la Conversion Flotas. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR Conversion Flotas */
  const actualizarConversionFlotas = async (ConversionFlotas) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, ConversionFlotas));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversion Flotas actualizada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar la Conversion Flotas. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR Conversion Flotas */
  const eliminarConversionFlotas = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: "Conversion Flotas eliminada con exito!" })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar la Conversion Flotas. ${error}`,
        })
      );
    }
  };

  return (
    <ConversionFlotasContext.Provider
      value={{
        ConversionFlotasList: state.ConversionFlotasList,
        ConversionFlotasActual: state.ConversionFlotasActual,

        flotaList: state.flotaList,
        fuenteInformacionList: state.fuenteInformacionList,
        conversionLugarTrabajoList: state.conversionLugarTrabajoList,

        obtenerConversionesFlotas,
        obtenerConversionFlotas,
        registrarConversionFlotas,
        actualizarConversionFlotas,
        eliminarConversionFlotas,

        mensaje,
        SetMensaje,
        tipoAlerta,
        SetTipoAlerta,
      }}>
      {props.children}
    </ConversionFlotasContext.Provider>
  );
};
