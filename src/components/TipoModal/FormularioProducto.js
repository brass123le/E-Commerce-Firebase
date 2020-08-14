import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
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
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { createProducto } from "../../redux/acciones/producto";
import subir from '../../assets/png/subir.png'

export const FormularioProducto = () => {
  const { arrayCategoria } = useSelector((state) => state.categoria);
  const dispatch = useDispatch();
  const [categoria, setCategoria] = useState(null);
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUrl(URL.createObjectURL(file));
    setFile(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg , image/png",
    noKeyboard: true,
    onDrop,
  });
  const formIk = useFormik({
    initialValues: {
      producto: "",
      precio: "",

      descripcion: "",
    },
    validationSchema: Yup.object({
      producto: Yup.string().required(),
      precio: Yup.string().required(),

      descripcion: Yup.string().required(),
    }),

    onSubmit: (e) => {
      if (!file || !categoria) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Seleccione una imagen para producto!",
        });
      } else {
        e.categoria = categoria;

        dispatch(createProducto({ file, producto: e }));
      }
    },
  });
  return (
    <Modal.Content image>
      <div {...getRootProps()} className='img_container' >
        <Image
          wrapped
          size="medium"
          
          src={
            url
              ? url
              :subir
          }
        />

        <input {...getInputProps()} />
      </div>
      <Modal.Description>
        <Header>Formulario</Header>
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
              value={categoria}
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
