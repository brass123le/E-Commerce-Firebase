import React, { useState } from "react";

import {
  Modal,
  Image,
  Button,
  Header,
  Form,
  Select,
  Input,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProducto } from "../../redux/acciones/producto";

export const FormularioEdicion = () => {
  const { id, categoria, descripcion, img, precio, producto } = useSelector(
    (state) => state.product.producto
  );
  const { arrayCategoria } = useSelector((state) => state.categoria);

  const dispatch = useDispatch();
  const [categoria1, setCategoria] = useState(categoria ? categoria : "");
  const formIk = useFormik({
    initialValues: {
      producto: producto ? producto : "",
      precio: precio ? precio : "",

      descripcion: descripcion ? descripcion : "",
    },
    validationSchema: Yup.object({
      producto: Yup.string().required(),
      precio: Yup.string().required(),

      descripcion: Yup.string().required(),
    }),

    onSubmit: (e) => {
      e.img = img;
      e.id = id;
      e.categoria=categoria1
      dispatch(updateProducto({ producto: e }));
    },
  });
  return (
    <Modal.Content image>
      <div>
        <Image wrapped size="medium" src={img?.url} />
      </div>
      <Modal.Description>
        <Header>Formulario Edicion</Header>
        <Form onSubmit={formIk.handleSubmit}>
          <Form.Field>
            <label>Producto</label>
            <Input
              type="text"
              placeholder="Producto"
              name="producto"
              onChange={formIk.handleChange}
              value={formIk.values.producto}
              error={formIk.errors.producto && true}
            />
          </Form.Field>
          <Form.Field>
            <label>Precio</label>
            <Input
              type="text"
              placeholder="Precio"
              name="precio"
              onChange={formIk.handleChange}
              value={formIk.values.precio}
              error={formIk.errors.precio && true}
            />
          </Form.Field>
          <Form.Field>
            <label>Descripción</label>
            <Form.TextArea
              placeholder="Descripción"
              name="descripcion"
              onChange={formIk.handleChange}
              value={formIk.values.descripcion}
              error={formIk.errors.descripcion && true}
            />
          </Form.Field>
          <Form.Field>
            <Select
              fluid
              placeholder="Selecione una categoria"
              options={arrayCategoria}
              value={categoria1}
              onChange={(e, data) => {
                setCategoria(data.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Button type="submit">Guardar Producto</Button>
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
  );
};
