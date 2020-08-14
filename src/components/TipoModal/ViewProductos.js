import React from "react";

import Info from "./Info";
import { useSelector } from "react-redux";

export const ViewProductos = () => {
  const { producto } = useSelector((state) => state.product);
  
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="shoeBackground">
            
            <img
              src={
               producto.img.url
              }
              alt="blue shoe"
              className="shoe show"
            />
          </div>
          <Info product={producto} />
        </div>
      </div>
    </>
  );
};
