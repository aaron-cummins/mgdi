import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import modulosReducer from "../reducer/modulosReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const ModulosContext = createContext();

export const ModulosContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();

  const urlApi = "modulos";

  const initialState = {
    modulosList: [],
    modulosActual: null,
  };

  const [state, dispatch] = useReducer(modulosReducer, initialState);

  /* OBETENER LISTADO DE MODULOSS */
  const obtenerModuloslist = async () => {
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

  /* OBTENER UNA MODULOS */
  const obtenerModulos = async (modulos) => {
    try {
      let modulosEncontrada = null;
      if (modulos !== null) {
        const resultado = await callEndpoint(getByID(urlApi, modulos.id));
        if (resultado && resultado.data) {
          modulosEncontrada = resultado.data;
        }
      } else {
        modulosEncontrada = modulos;
      }

      dispatch({
        type: OBTENER,
        payload: modulosEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR MODULOS */
  const registrarModulos = async (modulos) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, modulos));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Módulo creado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",
          mensaje: `'Ocurrió un error al intentar crear el Módulo. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR MODULOS */
  const actualizarModulos = async (modulos) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, modulos));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Módulo actualizado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar el Módulo. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR MODULOS */
  const eliminarModulos = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Módulo eliminado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar el Módulo. ${error}`,
        })
      );
    }
  };

  return (
    <ModulosContext.Provider
      value={{
        modulosList: state.modulosList,
        modulosActual: state.modulosActual,

        obtenerModuloslist,
        obtenerModulos,
        registrarModulos,
        actualizarModulos,
        eliminarModulos,
      }}>
      {props.children}
    </ModulosContext.Provider>
  );
};
