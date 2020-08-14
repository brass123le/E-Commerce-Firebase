import React from "react";

import { Modal } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/acciones/ui";

export const ModalContainer = ({ children }) => {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.ui);

  return (
    <Modal open={value} onClose={() => dispatch(closeModal())}>
      <Modal.Header>Producto</Modal.Header>
      {children}
    </Modal>
  );
};
