import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS } from "const/actionTypes";

const comunaReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        comunaList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        comunaList: [...state.comunaList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        comunaActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        comunaList: state.comunaList.map((comuna) => (comuna.id === action.payload.id ? action.payload : comuna)),
      };
    case ELIMINAR:
      return {
        ...state,
        comunaList: state.comunaList.filter((comuna) => comuna.id !== action.payload),
      };
    case OBTENER_LISTA_ACTIVAS:
      return {
        ...state,
        regionListActiva: action.payload,
      };
    default:
      return state;
  }
};

export default comunaReducer;
