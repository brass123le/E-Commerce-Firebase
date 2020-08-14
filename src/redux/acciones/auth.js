import { auth } from "../../util/firebase";
import { type } from "../../type/type";
import Swal from "sweetalert2";

export const startLogin = ({ email, password }) => async (dispatch) => {
  try {
    const usuario = await auth.signInWithEmailAndPassword(email, password);

    dispatch(login({ email: usuario.user.email, uid: usuario.user.uid }));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Al iniciar sesion!",
    });
  }
};

export const login = ({ email, uid }) => ({
  type: type.auth_login,
  payload: { email, uid },
});

export const startLogout = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch({ type: type.auth_logout });
  } catch (error) {
    console.log("startLogout -> error", error);
  }
};
