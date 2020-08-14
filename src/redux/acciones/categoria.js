import { type } from "../../type/type";
import { db, storege } from "../../util/firebase";
import { v4 as UuidV4 } from "uuid";
import Swal from "sweetalert2";
import { closeModal } from "./ui";

export const crearCategoria = ({ categoria, file }) => async (
  dispatch,
  getState
) => {
  try {
    const { uid } = getState().auth;
    const nombre = UuidV4();
    await subirImagen(file, nombre);
    const url = await obtenerImagen(nombre);
    const newCategoria = {
      ...categoria,
      img: {
        name: nombre,
        url,
      },
      uid,
    };

    const doc = await db.collection(`Categorias`).add(newCategoria);
    newCategoria.id = doc.id;


    const newEstado = {
      key: doc.id,
      value: newCategoria.categoria,
      text: newCategoria.categoria,
      img: {
        name: nombre,
        url,
      },
      uid,
    };

    dispatch({ type: type.categoria_create, payload: newEstado });
    dispatch(closeModal());
  } catch (error) {
    console.log("crearCategoria -> error", error);
  }
};

const subirImagen = async (file, nombre) => {
  return await storege.ref().child(`categoria/${nombre}`).put(file);
};
const obtenerImagen = async (nombre) => {
  return await storege.ref(`categoria/${nombre}`).getDownloadURL();
};

const obtenerEliminar = async (nombre) => {
  return await storege.ref(`categoria/${nombre}`).delete();
};

export const deleteCategoria = ({ id, nombre }) => async (dispatch) => {
  console.log("deleteCategoria -> id", id)
  try {
    await db.collection("Categorias").doc(id).delete();
    await obtenerEliminar(nombre);

    dispatch({ type: type.categoria_eliminar, payload: id });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al eliminar el categoria!",
    });
  }
};

export const obtenerCategoria = () => async (dispatch) => {
  try {
    const categoria = await db.collection("Categorias");
    categoria.get().then((snap) => {
      const array = [];
      snap.forEach((categoria) => {
        array.push({
          key: categoria.id,
          value: categoria.data().categoria,
          text: categoria.data().categoria,
          img: categoria.data().img,
        });
        dispatch({ type: type.obtenerCategoria, payload: array });
      });
    });
  } catch (error) {
    console.log("obtenerCategoria -> error", error);
  }
};
