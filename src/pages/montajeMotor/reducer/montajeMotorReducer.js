import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const montajeMotorReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        montajemotorList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        montajemotorList: [...state.montajemotorList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        montajemotorActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        montajemotorList: state.montajemotorList.map((montajemotor) =>
          montajemotor.id === action.payload.id ? action.payload : montajemotor
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        montajemotorList: state.montajemotorList.filter((montajemotor) => montajemotor.id !== action.payload),
      };
    default:
      return state;
  }
};
export default montajeMotorReducer;
