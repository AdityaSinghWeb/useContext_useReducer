import React from "react";
import Cart from "./Cart";
import { forwardRef } from "react";
import { createPortal } from "react-dom";

function CartModal({ title, action }, ref) {
  return createPortal(
    <dialog id="modal" ref={ref}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {action}
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}

export default forwardRef(CartModal);
