import React from "react";
import { Header, Grid, Form, Segment, Button, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { startLogin } from "../../redux/acciones/auth";
import logo from '../../assets/png/logo.png'

export const Login = () => {
  const dispatch = useDispatch();
  const formIk = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: (e) => {
      dispatch(startLogin({ email: e.email, password: e.password }));
    },
  });
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={logo} />
          Login-Administrador
        </Header>
        <Form size="large" onSubmit={formIk.handleSubmit}>
          <Segment stacked>
            <Form.Input
              type="text"
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email"
              error={formIk.errors.email && true}
              name="email"
              onChange={formIk.handleChange}
            />
            <Form.Input
              type="password"
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              error={formIk.errors.password && true}
              name="password"
              onChange={formIk.handleChange}
            />

            <Button color="teal" fluid size="large">
              Ingresar
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
