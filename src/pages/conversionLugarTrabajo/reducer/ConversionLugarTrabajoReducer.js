import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const ConversionLugarTrabajoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        ConversionLugarTrabajoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        ConversionLugarTrabajoList: [...state.ConversionLugarTrabajoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        ConversionLugarTrabajoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        ConversionLugarTrabajoList: state.ConversionLugarTrabajoList.map((ConversionLugarTrabajo) =>
          ConversionLugarTrabajo.id === action.payload.id ? action.payload : ConversionLugarTrabajo
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        ConversionLugarTrabajoList: state.ConversionLugarTrabajoList.filter(
          (ConversionLugarTrabajo) => ConversionLugarTrabajo.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default ConversionLugarTrabajoReducer;
