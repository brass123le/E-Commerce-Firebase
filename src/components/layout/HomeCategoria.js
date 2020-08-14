import React, { useEffect } from "react";
import { SliderLeft } from "../Slider/SliderLeft";
import { Grid, GridRow } from "semantic-ui-react";
import { CardContainer } from "../container/CardContainer";
import { useSelector, useDispatch } from "react-redux";
import {  obtenerProductosCategoria } from "../../redux/acciones/producto";
import { useParams } from "react-router-dom";

export const HomeCategoria = () => {
  const {categoria}= useParams()
  const dispatch = useDispatch();
  useEffect( () => {
     dispatch(obtenerProductosCategoria(categoria));
  }, [dispatch,categoria]);
  const { productoCategoria } = useSelector((state) => state.product);

  return (
    <>
      <SliderLeft />
      <Grid container>
        <GridRow>
          <Grid columns={5} padded="vertically">
            <Grid.Row centered>
              {productoCategoria?.map((product) => {
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
