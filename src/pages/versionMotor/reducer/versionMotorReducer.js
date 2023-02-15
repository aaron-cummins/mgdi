import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const versionMotorReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        versionmotorList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        versionmotorList: [...state.versionmotorList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        versionmotorActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        versionmotorList: state.versionmotorList.map((versionmotor) =>
          versionmotor.id === action.payload.id ? action.payload : versionmotor
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        versionmotorList: state.versionmotorList.filter((versionmotor) => versionmotor.id !== action.payload),
      };
    default:
      return state;
  }
};
export default versionMotorReducer;
