import {
  OBTENER_LISTA,
  REGISTRAR,
  OBTENER,
  ACTUALIZAR,
  ELIMINAR,
  OBTENER_LISTA_UNIDAD,
  OBTENER_LISTA_ESN,
} from "const/actionTypes";

const eemmReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        eemmList: action.payload,
      };
    case OBTENER_LISTA_UNIDAD:
      return {
        ...state,
        eemmUnidad: action.payload,
      };
    case OBTENER_LISTA_ESN:
      return {
        ...state,
        eemmEsn: action.payload,
      };

    case REGISTRAR:
      return {
        ...state,
        eemmList: [...state.eemmList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        eemmActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        eemmList: state.eemmList.map((eemm) => (eemm.id === action.payload.id ? action.payload : eemm)),
        eemmActual: action.payload,
      };
    case ELIMINAR:
      return {
        ...state,
        eemmList: state.eemmList.filter((eemm) => eemm.id !== action.payload),
      };
    default:
      return state;
  }
};
export default eemmReducer;
