import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const TipoSalidaReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        TipoSalidaList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        TipoSalidaList: [...state.TipoSalidaList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        TipoSalidaActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        TipoSalidaList: state.TipoSalidaList.map((TipoSalida) =>
          TipoSalida.id === action.payload.id ? action.payload : TipoSalida
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        TipoSalidaList: state.TipoSalidaList.filter((TipoSalida) => TipoSalida.id !== action.payload),
      };
    default:
      return state;
  }
};
export default TipoSalidaReducer;
