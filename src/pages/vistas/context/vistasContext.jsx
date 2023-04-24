import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import vistasReducer from "../reducer/vistasReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const VistasContext = createContext();

export const VistasContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "vistas";

  const initialState = {
    vistasList: [],
    vistasActual: null,
    vistasGroupList: [],
  };

  const [state, dispatch] = useReducer(vistasReducer, initialState);

  /* OBETENER LISTADO DE VISTASGROUPS */
  const obtenerVistasGrouplist = async () => {
    try {
      const resultado = await callEndpoint(getList("vistasgroup"));
      if (resultado && resultado.data) {
        let GrupoVistasActivos = [];
        resultado.data.forEach((item) => {
          item.activo && GrupoVistasActivos.push({ id: item.id, nombre: item.modulos.nombre + " / " + item.nombre });
        });
        dispatch({
          type: OBTENER_LISTA_ACTIVAS,
          payload: GrupoVistasActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE VISTASS */
  const obtenerVistaslist = async () => {
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

  /* OBTENER UNA VISTAS */
  const obtenerVistas = async (vistas) => {
    try {
      let vistasEncontrada = null;
      if (vistas !== null) {
        const resultado = await callEndpoint(getByID(urlApi, vistas.id));
        if (resultado && resultado.data) {
          vistasEncontrada = resultado.data;
        }
      } else {
        vistasEncontrada = vistas;
      }

      dispatch({
        type: OBTENER,
        payload: vistasEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR VISTAS */
  const registrarVistas = async (vistas) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, vistas));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Vista creada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear la Vista. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR VISTAS */
  const actualizarVistas = async (vistas) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, vistas));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Vista actualizada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar la Vista. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR VISTAS */
  const eliminarVistas = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Vista eliminada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar la Vista. ${error}`,
        })
      );
    }
  };

  return (
    <VistasContext.Provider
      value={{
        vistasList: state.vistasList,
        vistasActual: state.vistasActual,
        vistasGroupList: state.vistasGroupList,

        obtenerVistaslist,
        obtenerVistas,
        registrarVistas,
        actualizarVistas,
        eliminarVistas,
        obtenerVistasGrouplist,
      }}>
      {props.children}
    </VistasContext.Provider>
  );
};
