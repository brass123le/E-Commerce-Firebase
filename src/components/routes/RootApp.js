import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../layout/Home";
import { Login } from "../layout/Login";
import { AdmiHome } from "../layout/AdmiHome";
import { Categoria } from "../layout/Categoria";
import { HomeCategoria } from "../layout/HomeCategoria";
import { PrivateRoute } from "./util/PrivateRoute";
import { PublicRoute } from "./util/PublicRoute";
import { firebase } from "../../util/firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/acciones/auth";

export const RootApp = () => {
  const dispatch = useDispatch();

  const { active, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(login({ email: user.email, uid: user.uid }));
    });
  }, [dispatch]);

  if (active) {
    return <h1>cargando</h1>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/categoria" component={Categoria} />
        <Route path="/categoria/:categoria" component={HomeCategoria} />
        <PublicRoute
          isAuthenticated={!!uid}
          exact
          path="/login"
          component={Login}
        />
        <PrivateRoute
          isAuthenticated={!!uid}
          exact
          path="/adminHome"
          component={AdmiHome}
        />
      </Switch>
    </Router>
  );
};
