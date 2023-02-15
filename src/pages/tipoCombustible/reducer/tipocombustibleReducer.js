import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const tipocombustibleReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        tipocombustibleList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        tipocombustibleList: [...state.tipocombustibleList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        tipocombustibleActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        tipocombustibleList: state.tipocombustibleList.map((tipocombustible) =>
          tipocombustible.id === action.payload.id ? action.payload : tipocombustible
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        tipocombustibleList: state.tipocombustibleList.filter(
          (tipocombustible) => tipocombustible.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default tipocombustibleReducer;
