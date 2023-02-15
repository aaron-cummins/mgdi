import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const paisReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        paisList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        paisList: [...state.paisList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        paisActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        paisList: state.paisList.map((pais) => (pais.id === action.payload.id ? action.payload : pais)),
      };
    case ELIMINAR:
      return {
        ...state,
        paisList: state.paisList.filter((pais) => pais.id !== action.payload),
      };
    default:
      return state;
  }
};

export default paisReducer;
