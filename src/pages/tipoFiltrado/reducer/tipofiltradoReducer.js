import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const tipofiltradoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        tipofiltradoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        tipofiltradoList: [...state.tipofiltradoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        tipofiltradoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        tipofiltradoList: state.tipofiltradoList.map((tipofiltrado) =>
          tipofiltrado.id === action.payload.id ? action.payload : tipofiltrado
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        tipofiltradoList: state.tipofiltradoList.filter((tipofiltrado) => tipofiltrado.id !== action.payload),
      };
    default:
      return state;
  }
};
export default tipofiltradoReducer;
