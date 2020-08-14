import React from "react";
import { Sidebar, Menu, Icon, Segment, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal, activarMenu } from "../../redux/acciones/ui";
import { ModalContainer } from "../container/ModalContainer";
import { FormularioProducto } from "../TipoModal/FormularioProducto";
import { FormularioCategoria } from "../TipoModal/FormularioCategoria";
import { useSelector } from "react-redux";
import { ViewProductos } from "../TipoModal/ViewProductos";
import { FormularioEdicion } from "../TipoModal/FormularioEdicion";
import { startLogout } from "../../redux/acciones/auth";

export const SliderLeft = () => {
  const history = useHistory();
  
  

  const dispatch = useDispatch();

  const { option ,valido} = useSelector((state) => state.ui);
  const { uid } = useSelector((state) => state.auth);

  const modalOption = (type) => {
    switch (type) {
      case "Modal-categoria":
        return <FormularioCategoria />;

      case "Modal-producto":
        return <FormularioProducto />;

      case "Modal-View":
        return <ViewProductos />;

      case "Modal-Edicion":
        return <FormularioEdicion />;

      default:
        break;
    }
  };

  return (
    <>
      <Sidebar.Pusher as={Segment} className="slider">
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={() => dispatch(activarMenu())}
          vertical
          visible={valido}
          width="thin"
        >
          <Menu.Item as="a" onClick={() => history.push("/")}>
            <Icon name="shopping basket" />
            Home
          </Menu.Item>
          <Menu.Item as="a" onClick={() => history.push("/categoria")}>
            <Icon name="shopping bag" />
            Categorias
          </Menu.Item>
          {uid && (
            <>
              <Menu.Item
                as="a"
                onClick={() => dispatch(openModal(true, "Modal-producto"))}
              >
                <Icon name="shopping basket" />
                Crear producto
              </Menu.Item>
              <Menu.Item
                as="a"
                onClick={() => dispatch(openModal(true, "Modal-categoria"))}
              >
                <Icon name="add square" />
                Crear Categoria
              </Menu.Item>
              <Menu.Item as="a" onClick={() => history.push("/adminHome")}>
                <Icon name="home" />
                Admin
              </Menu.Item>
              <Menu.Item as="a" onClick={() =>dispatch(startLogout()) }>
                <Icon name="close" />
                Salir
              </Menu.Item>
            </>
          )}
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic className="slider-nav">
            <Header as={"h3"}>Tienda de zapatos</Header>
            <Icon name="align justify" onClick={()=>dispatch(activarMenu())} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pusher>

      <ModalContainer>{modalOption(option)}</ModalContainer>
    </>
  );
};
