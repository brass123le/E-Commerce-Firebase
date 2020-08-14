import React, { useEffect } from "react";
import { SliderLeft } from "../Slider/SliderLeft";
import { Grid, GridRow } from "semantic-ui-react";
import { CardContainer } from "../container/CardContainer";
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductos } from "../../redux/acciones/producto";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect( () => {
     dispatch(obtenerProductos());
  }, [dispatch]);
  const { productos } = useSelector((state) => state.product);

  return (
    <>
      <SliderLeft />
      <Grid container>
        <GridRow>
          <Grid columns={5} padded="vertically">
            <Grid.Row centered>
              {productos.map((product) => {
                return <CardContainer key={product.id} item={product} />;
              })}
            </Grid.Row>
          </Grid>
        </GridRow>
        <GridRow>paginacion</GridRow>
      </Grid>
    </>
  );
};
