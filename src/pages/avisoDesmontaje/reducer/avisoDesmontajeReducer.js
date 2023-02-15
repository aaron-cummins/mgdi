import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const avisoDesmontajeReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        avisoDesmontajeList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        avisoDesmontajeList: [...state.avisoDesmontajeList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        avisoDesmontajeActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        avisoDesmontajeList: state.avisoDesmontajeList.map((ad) => (ad.id === action.payload.id ? action.payload : ad)),
      };
    case ELIMINAR:
      return {
        ...state,
        avisoDesmontajeList: state.avisoDesmontajeList.filter((ad) => ad.id !== action.payload),
      };
    default:
      return state;
  }
};

export default avisoDesmontajeReducer;
