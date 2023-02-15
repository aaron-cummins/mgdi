import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR } from "const/actionTypes";

const PostTratamientoReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA:
      return {
        ...state,
        PostTratamientoList: action.payload,
      };
    case REGISTRAR:
      return {
        ...state,
        PostTratamientoList: [...state.PostTratamientoList, action.payload],
      };
    case OBTENER:
      return {
        ...state,
        PostTratamientoActual: action.payload,
      };
    case ACTUALIZAR:
      return {
        ...state,
        PostTratamientoList: state.PostTratamientoList.map((PostTratamiento) =>
          PostTratamiento.id === action.payload.id ? action.payload : PostTratamiento
        ),
      };
    case ELIMINAR:
      return {
        ...state,
        PostTratamientoList: state.PostTratamientoList.filter(
          (PostTratamiento) => PostTratamiento.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
export default PostTratamientoReducer;
