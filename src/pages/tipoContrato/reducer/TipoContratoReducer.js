import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const TipoContratoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        TipoContratoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        TipoContratoList: [...state.TipoContratoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        TipoContratoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        TipoContratoList: state.TipoContratoList.map((TipoContrato) =>
          TipoContrato.id === action.payload.id ? action.payload : TipoContrato
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        TipoContratoList: state.TipoContratoList.filter((TipoContrato) => TipoContrato.id !== action.payload),
      };
    default:
      return state;
  }
};

export default TipoContratoReducer;
