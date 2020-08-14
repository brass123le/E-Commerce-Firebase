import { storege, db } from "../../util/firebase";
import { v4 as UuidV4 } from "uuid";
import { type } from "../../type/type";
import Swal from "sweetalert2";
import { closeModal} from "./ui";
export const createProducto = ({ file, producto }) => async (
  dispatch,
  getState
) => {
  try {
   
    const { uid } = getState().auth;
    const nombre = UuidV4();
    await subirImagen(file, nombre);
    const url = await obtenerImagen(nombre);

    const newProduc = {
      ...producto,
      img: {
        name: nombre,
        url,
      },
      uid,
    };

    const doc = await db.collection(`Productos`).add(newProduc);
    newProduc.id = doc.id;

    dispatch({ type: type.producto_create, payload: newProduc });
    
    dispatch(closeModal());
    
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
  }
};

const subirImagen = async (file, nombre) => {
  return await storege.ref().child(`producto/${nombre}`).put(file);
};
const obtenerImagen = async (nombre) => {
  return await storege.ref(`producto/${nombre}`).getDownloadURL();
};

const obtenerEliminar = async (nombre) => {
  return await storege.ref(`producto/${nombre}`).delete();
};

export const selecionarProducto = ({ producto }) => {
  return {
    type: type.producto_selecionar,
    payload: {
      producto,
    },
  };
};

export const updateProducto = ({ producto }) => async (dispatch, getState) => {
  const { uid } = getState().auth;
  producto.uid = uid;
  try {
   
    await db.collection("Productos").doc(producto.id).set(producto);

    dispatch({ type: type.producto_editar, payload: producto });
    
    dispatch(closeModal());
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al Modificar el Producto!",
    });
  }
};

export const deleteProducto = () => async (dispatch, getState) => {
  const { id, img } = getState().product.producto;
  try {
    await db.collection("Productos").doc(id).delete();
    await obtenerEliminar(img.name);

    dispatch({ type: type.producto_eliminar, payload: id });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al eliminar el Producto!",
    });
  }
};

export const obtenerProductos = () => async (dispatch) => {
  try {
    const productos = await db.collection("Productos");
    productos.get().then((snap) => {
      const array = [];
      snap.forEach((product) => {
        array.push({ id: product.id, ...product.data() });
      });
      dispatch({ type: type.producto_cargar, payload: array });
    });
  } catch (error) {
    console.log("obtenerCategoria -> error", error);
  }
};

export const obtenerProductosCategoria = (categoria) => async (dispatch) => {
  try {
    const productos = await db.collection("Productos");
    productos
      .where("categoria", "==", categoria)
      .get()
      .then((snap) => {
        const array = [];
        snap.forEach((product) => {
          array.push({ id: product.id, ...product.data() });
        });
        dispatch({ type: type.producto_cargar_categoria, payload: array });
      });
  } catch (error) {
    console.log("obtenerCategoria -> error", error);
  }
};

export const obtenerProductosAdministrador = () => async (
  dispatch,
  getState
) => {
  const { uid } = getState().auth;
  try {
    const productos = await db.collection("Productos");
    productos
      .where("uid", "==", uid)
      .get()
      .then((doc) => {
        const array = [];
        doc.forEach((product) => {
          array.push({ id: product.id, ...product.data() });
        });

        dispatch({ type: type.producto_cargar_admin, payload: array });
      });
  } catch (error) {
    console.log("obtenerCategoria -> error", error);
  }
};
