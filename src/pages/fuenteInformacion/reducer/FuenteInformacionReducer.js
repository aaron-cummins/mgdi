import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const FuenteInformacionReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        FuenteInformacionList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        FuenteInformacionList: [...state.FuenteInformacionList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        FuenteInformacionActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        FuenteInformacionList: state.FuenteInformacionList.map((FuenteInformacion) =>
          FuenteInformacion.id === action.payload.id ? action.payload : FuenteInformacion
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        FuenteInformacionList: state.FuenteInformacionList.filter(
          (FuenteInformacion) => FuenteInformacion.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default FuenteInformacionReducer;
