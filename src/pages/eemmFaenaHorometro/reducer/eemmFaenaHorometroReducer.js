import {
  OBTENER_LISTA,
  REGISTRAR,
  OBTENER,
  ACTUALIZAR,
  ELIMINAR,
  OBTENER_LISTA_UNIDAD,
  OBTENER_LISTA_ESN,
} from "const/actionTypes";

const eemmFaenaHorometroReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        eemmFaenaHorometroList: action.payload,
      };
    case OBTENER_LISTA_UNIDAD:
      return {
        ...state,
        eemmFaenaHorometroUnidad: action.payload,
      };
    case OBTENER_LISTA_ESN:
      return {
        ...state,
        eemmFaenaHorometroEsn: action.payload,
      };

    case REGISTRAR:
      return {
        ...state,
        eemmFaenaHorometroList: [...state.eemmFaenaHorometroList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        eemmFaenaHorometroActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        eemmFaenaHorometroList: state.eemmFaenaHorometroList.map((eemmFaenaHorometro) =>
          eemmFaenaHorometro.id === action.payload.id ? action.payload : eemmFaenaHorometro
        ),
        eemmFaenaHorometroActual: action.payload,
      };
    case ELIMINAR:
      return {
        ...state,
        eemmFaenaHorometroList: state.eemmFaenaHorometroList.filter(
          (eemmFaenaHorometro) => eemmFaenaHorometro.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default eemmFaenaHorometroReducer;
