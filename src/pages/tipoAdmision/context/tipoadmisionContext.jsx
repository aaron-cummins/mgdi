import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import tipoadmisionReducer from "../reducer/tipoadmisionReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const TipoAdmisionContext = createContext();

export const TipoAdmisionContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "tipoadmision";
  const initialState = {
    tipoadmisionList: [],
    tipoadmisionActual: null,
  };

  const [state, dispatch] = useReducer(tipoadmisionReducer, initialState);

  /* OBETENER LISTADO DE TIPOADMISIONS */
  const obtenerTipoAdmisiones = async () => {
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

  /* OBTENER UN TIPOADMISION */
  const obtenerTipoAdmision = async (tipoadmision) => {
    try {
      let tipoadmisionEncontrado = null;
      if (tipoadmision !== null) {
        const resultado = await callEndpoint(getByID(urlApi, tipoadmision.id));
        if (resultado && resultado.data) {
          tipoadmisionEncontrado = resultado.data;
        }
      } else {
        tipoadmisionEncontrado = tipoadmision;
      }

      dispatch({
        type: OBTENER,
        payload: tipoadmisionEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR TIPOADMISION */
  const registrarTipoAdmision = async (tipoadmision) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, tipoadmision));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Admisi??n creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurri?? un error al intentar crear el tipo admisi??n. ${error}`);
    }
  };

  /* ACTUALIZAR TIPOADMISION */
  const actualizarTipoAdmision = async (tipoadmision) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, tipoadmision));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Tipo Admisi??n actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurri?? un error al intentar actualizar el tipo admisi??n. ${error}`);
    }
  };

  /* ELIMINAR TIPOADMISION */
  const eliminarTipoAdmision = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Tipo Admisi??n eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurri?? un error al intentar eliminar el tipo admisi??n. ${error}`);
    }
  };

  return (
    <TipoAdmisionContext.Provider
      value={{
        tipoadmisionList: state.tipoadmisionList,
        tipoadmisionActual: state.tipoadmisionActual,

        obtenerTipoAdmisiones,
        obtenerTipoAdmision,
        registrarTipoAdmision,
        actualizarTipoAdmision,
        eliminarTipoAdmision,
      }}>
      {props.children}
    </TipoAdmisionContext.Provider>
  );
};
