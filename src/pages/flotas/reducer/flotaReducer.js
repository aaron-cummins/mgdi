import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS } from "const/actionTypes";

const flotaReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        flotaList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        flotaList: [...state.flotaList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        flotaActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        flotaList: state.flotaList.map((flota) => (flota.id === action.payload.id ? action.payload : flota)),
      };
    case ELIMINAR:
      return {
        ...state,
        flotaList: state.flotaList.filter((flota) => flota.id !== action.payload),
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
export default flotaReducer;
