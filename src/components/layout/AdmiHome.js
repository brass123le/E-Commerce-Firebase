import React, { useEffect } from "react";
import {
  Grid,
  GridRow,
  Table,
  Label,
  Container,
  Button,
  
} from "semantic-ui-react";
import { SliderLeft } from "../Slider/SliderLeft";

import { CardProductoAdmin } from "../container/CardProductoAdmin";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAdministrador } from "../../redux/acciones/producto";
import {
  obtenerCategoria,
  deleteCategoria,
} from "../../redux/acciones/categoria";

export const AdmiHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(obtenerProductosAdministrador());
  }, [dispatch]);
  const { productoAdmin } = useSelector((state) => state.product);
  const { arrayCategoria } = useSelector((state) => state.categoria);

  useEffect(() => {
    dispatch(obtenerCategoria());
  }, [dispatch]);

  return (
    <Grid style={{ height: "100vh" }} verticalAlign="middle">
      <SliderLeft />
      <Grid container>
        <GridRow>
          <Grid columns={3} padded="vertically">
            <Grid.Row centered>
              {productoAdmin.map((product) => (
                <CardProductoAdmin key={product.id} item={product} />
              ))}
            </Grid.Row>
          </Grid>
        </GridRow>
        <GridRow>
          <Container textAlign="center">
            <Grid columns={3} padded="vertically"></Grid>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Titulo</Table.HeaderCell>
                  <Table.HeaderCell>valor</Table.HeaderCell>
                  <Table.HeaderCell>Eliminar</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {arrayCategoria.map((categoria) => (
                  <Table.Row key={categoria.key}>
                    <Table.Cell>
                      <Label ribbon>{categoria.text}</Label>
                    </Table.Cell>
                    <Table.Cell>{categoria.value}</Table.Cell>
                    <Table.Cell>
                      <Button
                        color="red"
                        onClick={() =>
                          dispatch(
                            deleteCategoria({
                              id: categoria.key,
                              nombre: categoria.img.name,
                            })
                          )
                        }
                      >
                        Eliminar
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Container>
        </GridRow>
      </Grid>
    </Grid>
  );
};
