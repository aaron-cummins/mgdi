import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const avisoMontajeReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        avisoMontajeList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        avisoMontajeList: [...state.avisoMontajeList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        avisoMontajeActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        avisoMontajeList: state.avisoMontajeList.map((am) => (am.id === action.payload.id ? action.payload : am)),
      };
    case ELIMINAR:
      return {
        ...state,
        avisoMontajeList: state.avisoMontajeList.filter((am) => am.id !== action.payload),
      };
    default:
      return state;
  }
};
export default avisoMontajeReducer;
