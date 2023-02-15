import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const ConversionFlotasReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        ConversionFlotasList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        ConversionFlotasList: [...state.ConversionFlotasList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        ConversionFlotasActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        ConversionFlotasList: state.ConversionFlotasList.map((ConversionFlotas) =>
          ConversionFlotas.id === action.payload.id ? action.payload : ConversionFlotas
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        ConversionFlotasList: state.ConversionFlotasList.filter(
          (ConversionFlotas) => ConversionFlotas.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default ConversionFlotasReducer;
