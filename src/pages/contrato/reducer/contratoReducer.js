import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const contratoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        contratoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        contratoList: [...state.contratoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        contratoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        contratoList: state.contratoList.map((contrato) =>
          contrato.id === action.payload.id ? action.payload : contrato
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        contratoList: state.contratoList.filter((contrato) => contrato.id !== action.payload),
      };
    default:
      return state;
  }
};

export default contratoReducer;
