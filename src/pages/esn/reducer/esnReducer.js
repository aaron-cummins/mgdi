import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const esnReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        esnList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        esnList: [...state.esnList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        esnActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        esnList: state.esnList.map((esn) => (esn.id === action.payload.id ? action.payload : esn)),
      };
    case ELIMINAR:
      return {
        ...state,
        esnList: state.esnList.filter((esn) => esn.id !== action.payload),
      };
    default:
      return state;
  }
};
export default esnReducer;
