import React from "react";

import { Link } from "react-router-dom";
import { urlWhap } from "../../util/EnviaUrl";
import { closeModal } from "../../redux/acciones/ui";
import { useDispatch } from "react-redux";
const Info = ({ product }) => {
  const dispatch = useDispatch()
  
  const handelEnviarWhap = () => {
    const url = urlWhap(product.producto, product.precio, product.img.url);
    console.log("handelEnviarWhap -> url", url);
    window.open(url);
  };
  const { descripcion, producto, precio, categoria } = product;
  const shoeName = (
    <div className="shoeName">
      <div>
        <h1 className="big">{producto}</h1>
        <span className="new">new</span>
      </div>
      <h3 className="small">{categoria}</h3>
    </div>
  );

  const description = (
    <div className="description">
      <h3 className="title">Informacion</h3>
      <p className="text">{descripcion}.</p>
    </div>
  );

  const BuySection = (
    <div>
      <div className="buy-price">
        <Link className="buy"  onClick={handelEnviarWhap}>WhatsApp</Link>
        <Link className="buy_regre" onClick={()=>dispatch(closeModal())}>Regresar  </Link>
        <div className="price">
          <h1>$</h1>
          <h1>{precio}</h1>
        </div>
      </div>
      
    </div>
  );

  return (
    <div className="info">
      {shoeName}
      {description}
      {BuySection}
    </div>
  );
};

export default Info;
