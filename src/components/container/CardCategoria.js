import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const CardCategoria = ({ categoria }) => {
  const { img, text } = categoria;

  return (
    <Link to={`categoria/${text}`}>
      <Card image={img?.url} header={text} meta={text} />
    </Link>
  );
};
