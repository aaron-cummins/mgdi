import React, { createContext, useReducer } from "react";
import {
  OBTENER_LISTA_AD,
  OBTENER_LISTA_AM,
  OBTENER_LISTA_APLICACION,
  OBTENER_LISTA_APLICACION_OEM,
  OBTENER_LISTA_CARGOS,
  OBTENER_LISTA_COMUNAS,
  OBTENER_LISTA_ESN,
  OBTENER_LISTA_CONVERSION_LUGAR_TRABAJO,
  OBTENER_LISTA_CONVERSION_FLOTA,
  OBTENER_LISTA_FLOTAS,
  OBTENER_LISTA_FLOTAS_LUGAR_TRABAJO,
  OBTENER_LISTA_FUENTE_INFORMACION,
  OBTENER_LISTA_LUGAR_TRABAJO,
  OBTENER_LISTA_LUGAR_TRABAJO_USUARIO,
  OBTENER_LISTA_MODULOS,
  OBTENER_LISTA_OEM,
  OBTENER_LISTA_PAISES,
  OBTENER_LISTA_REGIONES,
  OBTENER_LISTA_ROLES,
  OBTENER_LISTA_TIPO_LUGAR_TRABAJO,
  OBTENER_LISTA_TIPO_CONTRATOS,
  OBTENER_LISTA_VERSION_EQUIPO,
  OBTENER_LISTA_ZONAS,
  OBTENER_LISTA_MONITOREO_FILTRO,
  OBTENER_LISTA_MONITOREO_MOTOR,
  OBTENER_LISTA_UNIDADES,
  OBTENER_LISTA_TIPO_ADMISION,
  OBTENER_LISTA_TIPO_BLOCK,
  OBTENER_LISTA_TIPO_COMBUSTIBLE,
  OBTENER_LISTA_TIPO_EMISION,
  OBTENER_LISTA_TIPO_FILTRADO,
  OBTENER_LISTA_TIPO_INYECCION,
  OBTENER_LISTA_MODULO_CONTROL,
  OBTENER_LISTA_MOTIVO_CAMBIO,
  OBTENER_LISTA_POST_TRATAMIENTO,
  OBTENER_LISTA_MOTOR,
  OBTENER_LISTA_VERSION_MOTOR,
  OBTENER_LISTA_ESTADO_EQUIPO_INSTALACION,
  OBTENER_LISTA_ESTADO_MOTOR_INSTALACION,
  OBTENER_LISTA_ESTADO_EQUIPO,
  OBTENER_LISTA_ESTADO_MOTOR,
  OBTENER_LISTA_TIPO_SALIDA,
  OBTENER_LISTA_UB,
} from "const/actionTypes";
import { getByID, getList } from "services/genericService";
import selectsReducer from "reducer/selectsReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { formatDateshort } from "utilities/Utiles";

export const SelectsContext = createContext();

export const SelectsContextProvider = (props) => {
  //const styleSetect =
  //  "form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  const styleSetect =
    "form-control block w-full px-3 py-1.5 border border-solid rounded border-gray-300 text-gray-600 pl-1";

  //const styleSetect =
  //  "form-control block w-full px-3 py-1.5 rounded-l-lg border-t-1 border-l-1 border-b-1 border-solid border-gray-300 text-gray-600 pl-1";
  const styleErrorSelect = "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1";

  const { callEndpoint } = useFetchAndLoad();
  const initialState = {
    adList: [],
    amList: [],
    aplicacionesList: [],
    aplicacionOemsList: [],
    cargosList: [],
    comunaList: [],
    esnList: [],
    estadoEquipoList: [],
    estadoMotorList: [],
    estadoEquipoInstalacionList: [],
    estadoMotorInstalacionList: [],
    conversionLugarTrabajoList: [],
    conversionFlotaList: [],
    flotasList: [],
    flotasLugarTrabajoList: [],
    fuenteInformacionList: [],
    lugarTrabajoList: [],
    lugarTrabajoUsuarioList: [],
    motoresList: [],
    modulosList: [],
    moduloControlList: [],
    monitoreoMotorList: [],
    monitoreoFiltroList: [],
    motivoCambioList: [],
    oemsList: [],
    paisList: [],
    postTratamientoList: [],
    regionListActiva: [],
    rolesList: [],
    tipoAdmisionList: [],
    tipoBlockList: [],
    tipoCombustibleList: [],
    tipoEmisionList: [],
    tipoFiltradoList: [],
    tipoInyeccionList: [],
    tipoLugarTrabajoList: [],
    tipoContratoList: [],
    tipoSalidaList: [],
    unidadesList: [],
    obList: [],
    versionEquiposList: [],
    versionMotorList: [],
    zonaList: [],
  };

  const [state, dispatch] = useReducer(selectsReducer, initialState);

  /* OBETENER LISTADO DE PAISES ACTIVAS */
  const obtenerPais = async () => {
    try {
      const resultado = await callEndpoint(getList("pais"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_PAISES,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE REGIONES ACTIVAS */
  const obtenerRegiones = async () => {
    try {
      const resultado = await callEndpoint(getList("region"));
      if (resultado && resultado.data) {
        let RegionActivas = [];
        resultado.data.forEach((item) => {
          item.activo && RegionActivas.push(item);
        });

        dispatch({
          type: OBTENER_LISTA_REGIONES,
          payload: RegionActivas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Zona ACTIVAS */
  const obtenerZonas = async () => {
    try {
      const resultado = await callEndpoint(getList("zona"));
      if (resultado && resultado.data) {
        let ZonasActivas = [];
        resultado.data.forEach((item) => {
          item.activo && ZonasActivas.push(item);
        });

        dispatch({
          type: OBTENER_LISTA_ZONAS,
          payload: ZonasActivas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE tipo lugar de trabajo ACTIVAS */
  const obtenerTipoLugarTrabajo = async () => {
    try {
      const resultado = await callEndpoint(getList("tipolugartrabajo"));
      if (resultado && resultado.data) {
        let tipoLugarTrabajoActivos = [];
        resultado.data.forEach((item) => {
          item.activo && tipoLugarTrabajoActivos.push({ id: item.id, nombre: item.tipo });
        });

        dispatch({
          type: OBTENER_LISTA_TIPO_LUGAR_TRABAJO,
          payload: tipoLugarTrabajoActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE comuna ACTIVAS */
  const obtenerComunas = async () => {
    try {
      const resultado = await callEndpoint(getList("comuna"));
      if (resultado && resultado.data) {
        let ComunasActivas = [];
        resultado.data.forEach((item) => {
          item.activo && ComunasActivas.push(item);
        });

        dispatch({
          type: OBTENER_LISTA_COMUNAS,
          payload: ComunasActivas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Lugar de trabajo */
  const obtenerLugaresTrabajo = async () => {
    try {
      const resultado = await callEndpoint(getList("lugartrabajo"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_LUGAR_TRABAJO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Lugar de trabajo */
  const obtenerLugaresTrabajoUsuario = async (lugaresTrabajo_usuario) => {
    try {
      if (lugaresTrabajo_usuario.length > 0) {
        dispatch({
          type: OBTENER_LISTA_LUGAR_TRABAJO_USUARIO,
          payload: lugaresTrabajo_usuario,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE MODULOSS */
  const obtenerModulos = async () => {
    try {
      const resultado = await callEndpoint(getList("modulos"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MODULOS,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Rol */
  const obtenerRol = async () => {
    try {
      const resultado = await callEndpoint(getList("roles"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_ROLES,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Cargos */
  const obtenerCargos = async () => {
    try {
      const resultado = await callEndpoint(getList("cargo"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_CARGOS,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion OEM */
  const obtenerAplicacionOems = async () => {
    try {
      const resultado = await callEndpoint(getList("aplicacionoem"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_APLICACION_OEM,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion OEM */
  const obtenerOems = async () => {
    try {
      const resultado = await callEndpoint(getList("oem"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_OEM,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Flotas */
  const obtenerFlotas = async () => {
    try {
      const resultado = await callEndpoint(getList("flotas"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_FLOTAS,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion OEM */
  const obtenerVersionEquipos = async () => {
    try {
      const resultado = await callEndpoint(getList("versionequipo"));
      if (resultado && resultado.data) {
        let versionEquipoActivos = [];
        resultado.data.forEach((item) => {
          item.activo && versionEquipoActivos.push({ id: item.id, nombre: item.version });
        });

        dispatch({
          type: OBTENER_LISTA_VERSION_EQUIPO,
          payload: versionEquipoActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion */
  const obtenerAplicaciones = async () => {
    try {
      const resultado = await callEndpoint(getList("aplicacion"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_APLICACION,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion */
  const obtenerTipoContrato = async () => {
    try {
      const resultado = await callEndpoint(getList("tipocontrato"));
      if (resultado && resultado.data) {
        let tcontratoActivos = [];
        resultado.data.forEach((item) => {
          item.activo && tcontratoActivos.push(item);
        });

        dispatch({
          type: OBTENER_LISTA_TIPO_CONTRATOS,
          payload: tcontratoActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Monitoreo Motor */
  const obtenerMonitoreoMotor = async () => {
    try {
      const resultado = await callEndpoint(getList("monitoreomotor"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MONITOREO_MOTOR,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Monitoreo Filtro */
  const obtenerMonitoreoFiltro = async () => {
    try {
      const resultado = await callEndpoint(getList("monitoreofiltro"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MONITOREO_FILTRO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Flotas Lugar trabajo */
  const obtenerFlotasLugarTrabajo = async (id) => {
    try {
      const resultado = await callEndpoint(getByID("flotalugartrabajo/filtro", id));

      let flotas_lugar_trabajo_Activas = [];
      resultado.data.forEach((item) => {
        item.activo && flotas_lugar_trabajo_Activas.push({ id: item.id, nombre: item.flotas?.nombre });
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_FLOTAS_LUGAR_TRABAJO,
          payload: flotas_lugar_trabajo_Activas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Limpiar LISTADO DE Flotas Lugar trabajo */
  const limpiarFlotasLugarTrabajo = async () => {
    try {
      dispatch({
        type: OBTENER_LISTA_FLOTAS_LUGAR_TRABAJO,
        payload: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE unidades por ID flota o Listado completo*/
  const obtenerUnidades = async (id) => {
    try {
      let resultado;
      if (id) resultado = await callEndpoint(getByID("unidad/filtro", id));
      else resultado = await callEndpoint(getList("unidad"));

      let unidadesActivas = [];
      resultado.data.forEach((item) => {
        item.activo && unidadesActivas.push(item);
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_UNIDADES,
          payload: unidadesActivas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Limpiar LISTADO DE unidades */
  const limpiarUnidades = async () => {
    try {
      dispatch({
        type: OBTENER_LISTA_UNIDADES,
        payload: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE FUENTE DE INFORMACION */
  const obtenerFuenteInformacion = async () => {
    try {
      const resultado = await callEndpoint(getList("fuenteinformacion"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_FUENTE_INFORMACION,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE ESN */
  const obtenerEsn = async (montado) => {
    try {
      let resultado = [];

      montado !== ""
        ? (resultado = await callEndpoint(getList(`esn/montado/${montado}`)))
        : (resultado = await callEndpoint(getList("esn")));

      if (resultado && resultado.data) {
        let esnActivos = [];
        resultado.data.forEach((item) => {
          item.activo && esnActivos.push({ id: item.id, nombre: item.esn });
        });

        dispatch({
          type: OBTENER_LISTA_ESN,
          payload: esnActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Limpiar LISTADO DE ESN */
  const limpiarEsn = async () => {
    try {
      dispatch({
        type: OBTENER_LISTA_ESN,
        payload: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE CONVERSION FLOTA */
  const obtenerConversionFlota = async () => {
    try {
      const resultado = await callEndpoint(getList("conversionflotas"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_CONVERSION_FLOTA,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE MOTOR */
  const obtenerMotores = async () => {
    try {
      const resultado = await callEndpoint(getList("motor"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MOTOR,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE MODULO CONTROL */
  const obtenerModuloControl = async () => {
    try {
      const resultado = await callEndpoint(getList("modulocontrol"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MODULO_CONTROL,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Tipo Admision */
  const obtenerTipoAdmision = async () => {
    try {
      const resultado = await callEndpoint(getList("tipoadmision"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_ADMISION,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Tipo Block */
  const obtenerTipoBlock = async () => {
    try {
      const resultado = await callEndpoint(getList("tipoblock"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_BLOCK,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Tipo Combustible */
  const obtenerTipoCombustible = async () => {
    try {
      const resultado = await callEndpoint(getList("tipocombustible"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_COMBUSTIBLE,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Tipo Emision */
  const obtenerTipoEmision = async () => {
    try {
      const resultado = await callEndpoint(getList("tipoemision"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_EMISION,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Tipo Filtrado */
  const obtenerTipoFiltrado = async () => {
    try {
      const resultado = await callEndpoint(getList("tipofiltrado"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_FILTRADO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Tipo Inyeccion */
  const obtenerTipoInyeccion = async () => {
    try {
      const resultado = await callEndpoint(getList("tipoinyeccion"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_INYECCION,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Post Tratamiento */
  const obtenerPostTratamiento = async () => {
    try {
      const resultado = await callEndpoint(getList("posttratamiento"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_POST_TRATAMIENTO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE CONVERSION LUGAR TRABAJO*/
  const obtenerConversionLugarTrabajo = async () => {
    try {
      const resultado = await callEndpoint(getList("conversionlugartrabajo"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_CONVERSION_LUGAR_TRABAJO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Version motor */
  const obtenerVersionMotor = async () => {
    try {
      const resultado = await callEndpoint(getList("versionmotor"));
      if (resultado && resultado.data) {
        let versionMotorActivos = [];
        resultado.data.forEach((item) => {
          item.activo && versionMotorActivos.push({ id: item.id, nombre: item.nombreComercial });
        });

        dispatch({
          type: OBTENER_LISTA_VERSION_MOTOR,
          payload: versionMotorActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE ESTADO EQUIPO INSTALACION */
  const obtenerEstadoEquipoInstalaciones = async () => {
    try {
      const resultado = await callEndpoint(getList("estadoequipoinstalacion"));

      let estadosActivos = [];
      resultado.data.forEach((item) => {
        item.activo && estadosActivos.push(item);
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_ESTADO_EQUIPO_INSTALACION,
          payload: estadosActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE ESTADO MOTOR INSTALACION */
  const obtenerEstadoMotorInstalaciones = async () => {
    try {
      const resultado = await callEndpoint(getList("estadomotorinstalacion"));

      let estadosActivos = [];
      resultado.data.forEach((item) => {
        item.activo && estadosActivos.push(item);
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_ESTADO_MOTOR_INSTALACION,
          payload: estadosActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE ESTADO EQUIPO */
  const obtenerEstadoEquipo = async () => {
    try {
      const resultado = await callEndpoint(getList("estadoequipo"));

      let estadosActivos = [];
      resultado.data.forEach((item) => {
        item.activo && estadosActivos.push(item);
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_ESTADO_EQUIPO,
          payload: estadosActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE ESTADO MOTOR */
  const obtenerEstadoMotor = async (montaje = true) => {
    try {
      let resultado = [];
      montaje
        ? (resultado = await callEndpoint(getList("estadomotor/montaje")))
        : (resultado = await callEndpoint(getList("estadomotor/desmontaje")));

      let estadosActivos = [];
      resultado.data.forEach((item) => {
        item.activo && estadosActivos.push(item);
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_ESTADO_MOTOR,
          payload: estadosActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE Avso montaje  */
  const obtenerAm = async () => {
    try {
      let resultado = await callEndpoint(getList("am"));

      let amActivos = [];
      resultado.data.forEach((item) => {
        item.activo &&
          amActivos.push({ id: item.id, nombre: item.nombre + " - (" + formatDateshort(item.fecha) + ")" });
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_AM,
          payload: amActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE Aviso desmontaje */
  const obtenerAd = async () => {
    try {
      let resultado = await callEndpoint(getList("ad"));

      let adActivos = [];
      resultado.data.forEach((item) => {
        item.activo &&
          adActivos.push({ id: item.id, nombre: item.nombre + " - (" + formatDateshort(item.fecha) + ")" });
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_AD,
          payload: adActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE Motivos de cambio */
  const obtenerMotivoCambio = async () => {
    try {
      let resultado = await callEndpoint(getList("motivocambio"));

      let motivoActivos = [];
      resultado.data.forEach((item) => {
        item.activo && motivoActivos.push(item);
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MOTIVO_CAMBIO,
          payload: motivoActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE tipo Salida */
  const obtenerTipoSalida = async () => {
    try {
      let resultado = await callEndpoint(getList("tiposalida"));

      let tipoSalidaActivo = [];
      resultado.data.forEach((item) => {
        item.activo && tipoSalidaActivo.push(item);
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_SALIDA,
          payload: tipoSalidaActivo,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE UB */
  const obtenerUb = async () => {
    try {
      let resultado = await callEndpoint(getList("ub"));

      let ubActivos = [];
      resultado.data.forEach((item) => {
        item.activo && ubActivos.push({ id: item.id, nombre: item.nombre + " / " + item.procesamiento });
      });

      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_UB,
          payload: ubActivos,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SelectsContext.Provider
      value={{
        adList: state.adList,
        amList: state.amList,
        aplicacionOemsList: state.aplicacionOemsList,
        aplicacionesList: state.aplicacionesList,
        cargosList: state.cargosList,
        comunaList: state.comunaList,
        estadoEquipoList: state.estadoEquipoList,
        estadoMotorList: state.estadoMotorList,
        estadoEquipoInstalacionList: state.estadoEquipoInstalacionList,
        estadoMotorInstalacionList: state.estadoMotorInstalacionList,
        esnList: state.esnList,
        conversionLugarTrabajoList: state.conversionLugarTrabajoList,
        conversionFlotaList: state.conversionFlotaList,
        flotasList: state.flotasList,
        flotasLugarTrabajoList: state.flotasLugarTrabajoList,
        fuenteInformacionList: state.fuenteInformacionList,
        lugarTrabajoList: state.lugarTrabajoList,
        lugarTrabajoUsuarioList: state.lugarTrabajoUsuarioList,
        motoresList: state.motoresList,
        modulosList: state.modulosList,
        moduloControlList: state.moduloControlList,
        monitoreoFiltroList: state.monitoreoFiltroList,
        monitoreoMotorList: state.monitoreoMotorList,
        motivoCambioList: state.motivoCambioList,
        oemsList: state.oemsList,
        paisList: state.paisList,
        postTratamientoList: state.postTratamientoList,
        regionList: state.regionListActiva,
        rolesList: state.rolesList,
        tipoAdmisionList: state.tipoAdmisionList,
        tipoBlockList: state.tipoBlockList,
        tipoCombustibleList: state.tipoCombustibleList,
        tipoEmisionList: state.tipoEmisionList,
        tipoFiltradoList: state.tipoFiltradoList,
        tipoInyeccionList: state.tipoInyeccionList,
        tipoLugarTrabajoList: state.tipoLugarTrabajoList,
        tipoContratoList: state.tipoContratoList,
        tipoSalidaList: state.tipoSalidaList,
        unidadesList: state.unidadesList,
        ubList: state.ubList,
        versionEquiposList: state.versionEquiposList,
        versionMotorList: state.versionMotorList,
        zonaList: state.zonaList,

        styleSetect,
        styleErrorSelect,

        limpiarEsn,
        limpiarFlotasLugarTrabajo,
        limpiarUnidades,

        obtenerAd,
        obtenerAm,
        obtenerAplicaciones,
        obtenerAplicacionOems,
        obtenerCargos,
        obtenerComunas,
        obtenerEsn,
        obtenerEstadoEquipo,
        obtenerEstadoMotor,
        obtenerEstadoEquipoInstalaciones,
        obtenerEstadoMotorInstalaciones,
        obtenerMotores,
        obtenerConversionLugarTrabajo,
        obtenerConversionFlota,
        obtenerFlotas,
        obtenerFlotasLugarTrabajo,
        obtenerFuenteInformacion,
        obtenerModulos,
        obtenerModuloControl,
        obtenerMonitoreoFiltro,
        obtenerMonitoreoMotor,
        obtenerMotivoCambio,
        obtenerOems,
        obtenerLugaresTrabajo,
        obtenerLugaresTrabajoUsuario,
        obtenerPais,
        obtenerPostTratamiento,
        obtenerRegiones,
        obtenerRol,
        obtenerTipoAdmision,
        obtenerTipoBlock,
        obtenerTipoCombustible,
        obtenerTipoEmision,
        obtenerTipoFiltrado,
        obtenerTipoInyeccion,
        obtenerTipoLugarTrabajo,
        obtenerTipoContrato,
        obtenerTipoSalida,
        obtenerUnidades,
        obtenerUb,
        obtenerVersionEquipos,
        obtenerVersionMotor,
        obtenerZonas,
      }}>
      {props.children}
    </SelectsContext.Provider>
  );
};
