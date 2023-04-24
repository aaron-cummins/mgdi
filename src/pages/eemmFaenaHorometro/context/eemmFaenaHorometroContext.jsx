import { ACTUALIZAR, ELIMINAR, OBTENER, OBTENER_LISTA, OBTENER_LISTA_UNIDAD, REGISTRAR } from "const/actionTypes";
import { useFetchAndLoad } from "hooks";
import { createContext, useReducer, useState } from "react";
import { deleteObject, getByID, getList, postObject, putObject } from "services/genericService";
import { formatDate } from "utilities/Utiles";
import eemmFaenaHorometroReducer from "../reducer/eemmFaenaHorometroReducer";

export const EemmFaenaHorometroContext = createContext();

export const EemmFaenaHorometroContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();

  const urlApi = "eemmfaenahorometro";

  const initialState = {
    eemmFaenaHorometroList: [],
    eemmFaenaHorometroActual: null,
    eemmFaenaHorometroUnidad: [],
    eemmFaenaHorometroEsn: [],
  };

  const emmFaenaHorometroDefault = {
    lugarTrabajoId: 0,
    lugarTrabajo: { id: 0 },
    flotaLugarTrabajo_id: 0,
    flotaLugarTrabajo: { id: 0 },
    unidadId: 0,
    unidad: { id: 0 },
    ano: 0,
    mes: 0,
    dia: 0,
    hrCabina: 0.0,
    hrMotor: 0.0,
    hrAvance: 0.0,
    update_at: formatDate(Date(Date.now)),
    usuarioId: 0,
    usuario: { id: 0 },
  };

  const [eemmFaenaHorometro, setEemmFaenaHorometro] = useState(emmFaenaHorometroDefault);

  const [state, dispatch] = useReducer(eemmFaenaHorometroReducer, initialState);

  /* OBETENER LISTADO DE por unidad EEMMS */
  const obtenerEemmUnidadlist = async (id_unidad) => {
    try {
      const resultado = id_unidad ? await callEndpoint(getList(`${urlApi}/unidad/${id_unidad}`)) : [];

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_UNIDAD,
          payload: resultado.data,
        });
      } else {
        dispatch({
          type: OBTENER_LISTA_UNIDAD,
          payload: resultado,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE por Flota_lugar_trabajo EEMMS */
  const obtenerEemmFlotaLugarTrabajolist = async (id_flota) => {
    try {
      const resultado = id_flota ? await callEndpoint(getList(`${urlApi}/flotalugartrabajo/${id_flota}`)) : [];

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado.data,
        });
      } else {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE por Flota_lugar_trabajo EEMMS */
  const obtenerEemmLugarTrabajolist = async (id_lugar_trabajo) => {
    try {
      const resultado = id_lugar_trabajo
        ? await callEndpoint(getList(`${urlApi}/lugartrabajo/${id_lugar_trabajo}`))
        : [];

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado.data,
        });
      } else {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE por unidad EEMMS */
  const obtenerEemmUnidadDatalist = async (id_unidad) => {
    try {
      const resultado = id_unidad ? await callEndpoint(getList(`${urlApi}/unidad/${id_unidad}`)) : [];

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado.data,
        });
      } else {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE EEMMS */
  const obtenerEemmlist = async () => {
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

  /* OBTENER UNA EEMM */
  const obtenerEemm = async (eemm) => {
    try {
      let eemmEncontrada = null;
      if (eemm !== null) {
        const resultado = await callEndpoint(getByID(urlApi, eemm.id));
        if (resultado && resultado.data) {
          eemmEncontrada = resultado.data;
        }
      } else {
        eemmEncontrada = eemm;
      }

      dispatch({
        type: OBTENER,
        payload: eemmEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR EEMM */
  const registrarEemm = async (eemm, montaje) => {
    let eemmtipo = montaje ? "Montaje" : "Desmontaje";
    try {
      const resultado = await callEndpoint(postObject(urlApi, eemm));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: `${eemmtipo} realizado con exito!` }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar realizar el ${eemmtipo}. ${error}` })
      );
    }
  };

  /* ACTUALIZAR EEMM */
  const actualizarEemm = async (eemm, montaje) => {
    let eemmtipo = montaje ? "Montaje" : "Desmontaje";
    try {
      const resultado = await callEndpoint(putObject(urlApi, eemm));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "success", mensaje: `${eemmtipo} actualizado con exito!` })
      );
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar actualizar el ${eemmtipo}. ${error}` })
      );
    }
  };

  /* ELIMINAR EEMM */
  const eliminarEemm = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      return new Promise((resolve) => resolve({ tipoAlerta: "success", mensaje: "Montaje eliminado con exito!" }));
    } catch (error) {
      console.log(error);
      return new Promise((resolve) =>
        resolve({ tipoAlerta: "error", mensaje: `'Ocurrió un error al intentar eliminar el montaje. ${error}` })
      );
    }
  };

  return (
    <EemmFaenaHorometroContext.Provider
      value={{
        eemmFaenaHorometroList: state.eemmFaenaHorometroList,
        eemmFaenaHorometroActual: state.eemmFaenaHorometroActual,
        eemmFaenaHorometroUnidad: state.eemmFaenaHorometroUnidad,
        eemmFaenaHorometroEsn: state.eemmFaenaHorometroEsn,

        eemmFaenaHorometro,
        setEemmFaenaHorometro,

        obtenerEemmlist,
        obtenerEemmUnidadDatalist,
        obtenerEemmLugarTrabajolist,
        obtenerEemmFlotaLugarTrabajolist,
        obtenerEemmUnidadlist,

        obtenerEemm,
        registrarEemm,
        actualizarEemm,
        eliminarEemm,
      }}>
      {props.children}
    </EemmFaenaHorometroContext.Provider>
  );
};
