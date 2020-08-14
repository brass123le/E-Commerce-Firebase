import { type as typeName } from "../../type/type";

const initialState = {
  arrayCategoria: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.categoria_create:
      return { ...state, arrayCategoria: [...state.arrayCategoria,payload] };
    case typeName.obtenerCategoria:
      return { ...state, arrayCategoria: payload };
    case typeName.categoria_eliminar:
      return {
        ...state,
        arrayCategoria: state.arrayCategoria.filter(
          (categoria) => categoria.key !== payload
        ),
      };
    
    default:
      return state;
  }
};
