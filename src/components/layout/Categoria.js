import React, { useEffect } from "react";
import { SliderLeft } from "../Slider/SliderLeft";
import { CardCategoria } from "../container/CardCategoria";
import { Grid, GridRow } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerCategoria } from "../../redux/acciones/categoria";

export const Categoria = () => {
  const { arrayCategoria } = useSelector((state) => state.categoria);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(obtenerCategoria());
  }, [dispatch]);
  return (
    <>
      <SliderLeft />
      <Grid container>
        <GridRow>
          <Grid columns={3} padded="vertically">
            <Grid.Row centered>
              {arrayCategoria.map((categoria) => {
                return (
                  <CardCategoria categoria={categoria} key={categoria.key} />
                );
              })}
            </Grid.Row>
          </Grid>
        </GridRow>
        <GridRow>paginacion</GridRow>
      </Grid>
    </>
  );
};
