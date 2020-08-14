import { type as typeName } from "../../type/type";

const initialState = {
  email: "",
  uid: "",
  active: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case typeName.auth_login:
      return {
        ...state,
        email: payload.email,
        uid: payload.uid,
        active: false,
      };
    case typeName.auth_logout:
      return {
        email: "",
        uid: "",
        active: false,
      };

    default:
      return state;
  }
};
