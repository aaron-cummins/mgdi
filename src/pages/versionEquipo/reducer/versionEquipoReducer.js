import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const versionEquipoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        versionequipoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        versionequipoList: [...state.versionequipoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        versionequipoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        versionequipoList: state.versionequipoList.map((versionequipo) =>
          versionequipo.id === action.payload.id ? action.payload : versionequipo
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        versionequipoList: state.versionequipoList.filter((versionequipo) => versionequipo.id !== action.payload),
      };
    default:
      return state;
  }
};
export default versionEquipoReducer;
