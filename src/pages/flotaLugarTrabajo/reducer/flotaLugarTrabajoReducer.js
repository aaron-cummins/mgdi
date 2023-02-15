import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const flotaLugarTrabajoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        flotaLugarTrabajoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        flotaLugarTrabajoList: [...state.flotaLugarTrabajoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        flotaLugarTrabajoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        flotaLugarTrabajoList: state.flotaLugarTrabajoList.map((flota) =>
          flota.id === action.payload.id ? action.payload : flota
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        flotaLugarTrabajoList: state.flotaLugarTrabajoList.filter((flota) => flota.id !== action.payload),
      };
    default:
      return state;
  }
};
export default flotaLugarTrabajoReducer;
