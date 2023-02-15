import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const lugarTrabajoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        lugartrabajoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        lugartrabajoList: [...state.lugartrabajoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        lugartrabajoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        lugartrabajoList: state.lugartrabajoList.map((lugartrabajo) =>
          lugartrabajo.id === action.payload.id ? action.payload : lugartrabajo
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        lugartrabajoList: state.lugartrabajoList.filter((lugartrabajo) => lugartrabajo.id !== action.payload),
      };
    default:
      return state;
  }
};
export default lugarTrabajoReducer;
