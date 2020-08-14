import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import subir from "../../assets/png/subir.png";
import { Modal, Button, Header, Form, Image, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { crearCategoria } from "../../redux/acciones/categoria";

export const FormularioCategoria = () => {
  const dispatch = useDispatch();
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
      categoria: "",
    },
    validationSchema: Yup.object({
      categoria: Yup.string().required(),
    }),
    onSubmit: (e) => {
      if (!file) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Seleccione una imagen para la categoria!",
        });
      } else {
        dispatch(crearCategoria({ categoria: e, file }));
      }
    },
  });
  return (
    <Modal.Content image>
      <div {...getRootProps()} className="img_container">
        <Image wrapped size="medium" src={url ? url : subir} />

        <input {...getInputProps()} />
      </div>
      <Modal.Description>
        <Header>Formulario Categoria </Header>
        <Form onSubmit={formIk.handleSubmit}>
          <Form.Field>
            <label>Categoria</label>
            <Input
              placeholder="Ingrese una categoria "
              name="categoria"
              onChange={formIk.handleChange}
              value={formIk.values.categoria}
              error={formIk.errors.categoria && true}
            />
          </Form.Field>
          <Form.Field>
            <Button  type="submit">Submit</Button>
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
  );
};
