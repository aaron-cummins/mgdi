import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const ConversionUnidadReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        ConversionUnidadList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        ConversionUnidadList: [...state.ConversionUnidadList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        ConversionUnidadActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        ConversionUnidadList: state.ConversionUnidadList.map((ConversionUnidad) =>
          ConversionUnidad.id === action.payload.id ? action.payload : ConversionUnidad
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        ConversionUnidadList: state.ConversionUnidadList.filter(
          (ConversionUnidad) => ConversionUnidad.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default ConversionUnidadReducer;
