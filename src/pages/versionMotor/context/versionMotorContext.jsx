import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import versionmotorReducer from "../reducer/versionMotorReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const VersionMotorContext = createContext();

export const VersionMotorContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const urlApi = "versionmotor";

  const initialState = {
    versionmotorList: [],
    versionmotorActual: null,
  };

  const [state, dispatch] = useReducer(versionmotorReducer, initialState);

  /* OBETENER LISTADO DE VERSIONMOTORS */
  const obtenerVersionMotores = async () => {
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

  /* OBTENER UN VERSIONMOTOR */
  const obtenerVersionMotor = async (versionmotor) => {
    try {
      let versionmotorEncontrado = null;
      if (versionmotor !== null) {
        const resultado = await callEndpoint(getByID(urlApi, versionmotor.id));
        if (resultado && resultado.data) {
          versionmotorEncontrado = resultado.data;
        }
      } else {
        versionmotorEncontrado = versionmotor;
      }

      dispatch({
        type: OBTENER,
        payload: versionmotorEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR VERSIONMOTOR */
  const registrarVersionMotor = async (versionmotor) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, versionmotor));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Aplicación creada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar crear la aplicación. ${error}`,
        })
      );
    }
  };

  /* ACTUALIZAR VERSIONMOTOR */
  const actualizarVersionMotor = async (versionmotor) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, versionmotor));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Aplicación actualizada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar actualizar la aplicación. ${error}`,
        })
      );
    }
  };

  /* ELIMINAR VERSIONMOTOR */
  const eliminarVersionMotor = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Aplicación eliminada con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({
          tipoAlerta: "error",

          mensaje: `'Ocurrió un error al intentar eliminar la aplicación. ${error}`,
        })
      );
    }
  };

  return (
    <VersionMotorContext.Provider
      value={{
        versionmotorList: state.versionmotorList,
        versionmotorActual: state.versionmotorActual,

        obtenerVersionMotores,
        obtenerVersionMotor,
        registrarVersionMotor,
        actualizarVersionMotor,
        eliminarVersionMotor,
      }}>
      {props.children}
    </VersionMotorContext.Provider>
  );
};
