import { type } from "../../type/type";

export const openModal = (value, option) => (dispatch) => {
  dispatch({ type: type.ui_modal, payload: { value, option } });
};

export const closeModal = () => {
  return { type: type.ui_modal_close };
};

export const activarMenu = () => {
  return { type: type.ui_nabar };
};

