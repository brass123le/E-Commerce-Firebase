import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reduxThunk from "redux-thunk";
import ui from "./reducer/ui";
import auth from "./reducer/auth";
import producto from "./reducer/producto";
import categoria from "./reducer/categoria";

const RootReducer = combineReducers({ ui, auth, product: producto, categoria });
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
