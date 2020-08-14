import { type as typeName } from "../../type/type";

const initialState = {
  productos: [],
  producto: {},
  productoAdmin: [],
  productoCategoria:[]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.producto_create:
      return { ...state, productos: [...state.productos, payload],productoAdmin: [...state.productoAdmin, payload] };

    case typeName.producto_editar:
      return {
        ...state,
        productoAdmin: state.productoAdmin.map((producto) =>
          producto.id === payload.id ? payload : producto
        ),
        producto: {},
      };

    case typeName.producto_cargar:
      return { ...state, productos: payload };
    case typeName.producto_selecionar:
      return {
        ...state,
        producto: payload.producto,
      };
    case typeName.producto_cargar_admin:
      return {
        ...state,
        productoAdmin: payload,
      };
      case typeName.producto_cargar_categoria:
      return {
        ...state,
        productoCategoria: payload,
      };

    case typeName.producto_eliminar:
      return {
        ...state,
        productos: state.productos.filter((product) => product.id !== payload),
        producto: {},
        productoAdmin: state.productoAdmin.filter(
          (product) => product.id !== payload
        ),
      };
    case typeName.auth_logout:
      return {
        ...state,
        producto: {},
        productoAdmin: [],
      };
    default:
      return state;
  }
};
