import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const TipoBlockReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        TipoBlockList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        TipoBlockList: [...state.TipoBlockList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        TipoBlockActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        TipoBlockList: state.TipoBlockList.map((TipoBlock) =>
          TipoBlock.id === action.payload.id ? action.payload : TipoBlock
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        TipoBlockList: state.TipoBlockList.filter((TipoBlock) => TipoBlock.id !== action.payload),
      };
    default:
      return state;
  }
};
export default TipoBlockReducer;
