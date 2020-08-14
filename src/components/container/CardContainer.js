import React from "react";
import { Card, Grid, Image, Header } from "semantic-ui-react";
import LogoWhatsapp from "../../assets/png/whatsapp.png";
import LogoEye from "../../assets/png/visualizacion.png";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/acciones/ui";
import { selecionarProducto } from "../../redux/acciones/producto";
import { urlWhap } from "../../util/EnviaUrl";

export const CardContainer = ({ item }) => {
  const { descripcion, producto, precio, categoria, img } = item;
  return (
    <Card
      image={img.url}
      header={producto}
      meta={categoria}
      description={descripcion.substring(0, 100)}
      extra={<Extra precio={precio} item={item} />}
    />
  );
};

const Extra = ({ precio, item }) => {
  const handlerAcition = () => {
    dispatch(openModal(true, "Modal-View"));
    dispatch(selecionarProducto({ producto: item }));
  };
  const dispatch = useDispatch();

  const handelEnviarWhap = () => {
    const url = urlWhap(item.producto, item.precio, item.img.url);
    window.open(url);
  };
  return (
    <Grid.Column columns={3}>
      <Header>${precio}</Header>
      <Image src={LogoEye} onClick={handlerAcition} />
      <Image src={LogoWhatsapp} onClick={handelEnviarWhap} />
    </Grid.Column>
  );
};
