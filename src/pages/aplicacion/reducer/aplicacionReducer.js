import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const aplicacionReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        aplicacionList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        aplicacionList: [...state.aplicacionList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        aplicacionActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        aplicacionList: state.aplicacionList.map((aplicacion) =>
          aplicacion.id === action.payload.id ? action.payload : aplicacion
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        aplicacionList: state.aplicacionList.filter((aplicacion) => aplicacion.id !== action.payload),
      };
    default:
      return state;
  }
};
export default aplicacionReducer;
