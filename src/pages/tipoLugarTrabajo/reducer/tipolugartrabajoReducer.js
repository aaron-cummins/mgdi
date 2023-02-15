import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const tipolugartrabajoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        tipolugartrabajoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        tipolugartrabajoList: [...state.tipolugartrabajoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        tipolugartrabajoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        tipolugartrabajoList: state.tipolugartrabajoList.map((tipolugartrabajo) =>
          tipolugartrabajo.id === action.payload.id ? action.payload : tipolugartrabajo
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        tipolugartrabajoList: state.tipolugartrabajoList.filter(
          (tipolugartrabajo) => tipolugartrabajo.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default tipolugartrabajoReducer;
