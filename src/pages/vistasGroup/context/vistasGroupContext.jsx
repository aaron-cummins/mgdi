import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import vistasGroupReducer from "../reducer/vistasGroupReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const VistasGroupContext = createContext();

export const VistasGroupContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "vistasgroup";

  const initialState = {
    vistasgroupList: [],
    vistasgroupActual: null,
  };

  const [state, dispatch] = useReducer(vistasGroupReducer, initialState);

  /* OBETENER LISTADO DE VISTASGROUPS */
  const obtenerVistasGrouplist = async () => {
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

  /* OBTENER UNA VISTASGROUP */
  const obtenerVistasGroup = async (vistasgroup) => {
    try {
      let vistasgroupEncontrada = null;
      if (vistasgroup !== null) {
        const resultado = await callEndpoint(getByID(urlApi, vistasgroup.id));
        if (resultado && resultado.data) {
          vistasgroupEncontrada = resultado.data;
        }
      } else {
        vistasgroupEncontrada = vistasgroup;
      }

      dispatch({
        type: OBTENER,
        payload: vistasgroupEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR VISTASGROUP */
  const registrarVistasGroup = async (vistasgroup) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, vistasgroup));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Módulo creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Módulo. ${error}`);
    }
  };

  /* ACTUALIZAR VISTASGROUP */
  const actualizarVistasGroup = async (vistasgroup) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, vistasgroup));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Módulo actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Módulo. ${error}`);
    }
  };

  /* ELIMINAR VISTASGROUP */
  const eliminarVistasGroup = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Módulo eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Módulo. ${error}`);
    }
  };

  return (
    <VistasGroupContext.Provider
      value={{
        vistasgroupList: state.vistasgroupList,
        vistasgroupActual: state.vistasgroupActual,

        obtenerVistasGrouplist,
        obtenerVistasGroup,
        registrarVistasGroup,
        actualizarVistasGroup,
        eliminarVistasGroup,
      }}>
      {props.children}
    </VistasGroupContext.Provider>
  );
};
