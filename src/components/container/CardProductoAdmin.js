import React from "react";
import { Card, Grid, Image, Header } from "semantic-ui-react";
import LogoFormato from "../../assets/png/formato.png";
import LogoBasura from "../../assets/png/basura.png";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/acciones/ui";
import Swal from "sweetalert2";
import { selecionarProducto, deleteProducto } from "../../redux/acciones/producto";

export const CardProductoAdmin = ({ item }) => {
 
  const { descripcion, producto, categoria, img } = item;
  return (
    <Card
      image={img.url}
      header={producto}
      meta={categoria}
      description={descripcion?.substring(0, 100)}
      extra={<Extra item={item} />}
    />
  );
};

const Extra = ({item}) => {
  const dispatch = useDispatch();
  const eliminarCard = () => {
    dispatch(selecionarProducto({ producto: item }));
    Swal.fire({
      title: "Esta Seguro?",
      text: "una vez eliminado no se podra repuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteProducto())
        Swal.fire("Eliminado!", "Producto Eliminado.", "success");
      }
    });
  };
  const editarPublic = () => {
    dispatch(openModal(true, "Modal-Edicion"));
    dispatch(selecionarProducto({ producto: item }));
  };
  return (
    <Grid.Column columns={3}>
      <Header>${item.precio}</Header>
      <Image src={LogoFormato} onClick={editarPublic} />
      <Image src={LogoBasura} onClick={() => eliminarCard()} />
    </Grid.Column>
  );
};
