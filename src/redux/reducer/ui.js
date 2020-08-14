import { type as typeName } from "../../type/type";

const initialState = {
  value: false,
  option: "",
  valido: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.ui_modal:
      return { ...state, value: payload.value, option: payload.option };
    case typeName.ui_modal_close:
      return { ...state, value: false, option: "" };
    case typeName.ui_nabar:
      return { ...state, valido: !state.valido };

    default:
      return state;
  }
};
