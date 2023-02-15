import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import TipoContratoReducer from "../reducer/TipoContratoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const TipoContratoContext = createContext();

export const TipoContratoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "tipocontrato";

  const initialState = {
    TipoContratoList: [],
    TipoContratoActual: null,
  };

  const [state, dispatch] = useReducer(TipoContratoReducer, initialState);

  /* OBTENER LISTADO DE TIPO CONTRATO */
  const obtenerTipoContratos = async () => {
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

  /* OBTENER UN TIPO CONTRATO*/
  const obtenerTipoContrato = async (TipoContrato) => {
    try {
      let TipoContratoEncontrado = null;
      if (TipoContrato !== null) {
        const resultado = await callEndpoint(getByID(urlApi, TipoContrato.id));
        if (resultado && resultado.data) {
          TipoContratoEncontrado = resultado.data;
        }
      } else {
        TipoContratoEncontrado = TipoContrato;
      }

      dispatch({
        type: OBTENER,
        payload: TipoContratoEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPO CONTRATO */
  const registrarTipoContrato = async (TipoContrato) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, TipoContrato));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Contrato creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Tipo Contrato. ${error}`);
    }
  };

  /* ACTUALIZAR TIPO CONTRATO*/
  const actualizarTipoContrato = async (TipoContrato) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, TipoContrato));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Contrato actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Tipo Contrato. ${error}`);
    }
  };

  /* ELIMINAR TIPO CONTRATO*/
  const eliminarTipoContrato = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Tipo Contrato eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Tipo Contrato. ${error}`);
    }
  };

  return (
    <TipoContratoContext.Provider
      value={{
        TipoContratoList: state.TipoContratoList,
        TipoContratoActual: state.TipoContratoActual,

        obtenerTipoContratos,
        obtenerTipoContrato,
        registrarTipoContrato,
        actualizarTipoContrato,
        eliminarTipoContrato,
      }}>
      {props.children}
    </TipoContratoContext.Provider>
  );
};

export default TipoContratoContext;
