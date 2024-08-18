import React from "react";
import CartModal from "./CartModal";
import { useRef } from "react";
import { UserContext } from "../store/shopping-context";
import { useContext } from "react";

function Header() {
  const { items } = useContext(UserContext);
  const dialog = useRef();

  function handleOpenCart() {
    dialog.current.showModal();
  }

  let cartQuantity = items.length;

  let modalAction = <button>Close</button>;
  if (cartQuantity > 0) {
    modalAction = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={dialog} title="Your Cart" action={modalAction} />
      <header id="main-header">
        <div id="main-title">
          <img src="/logo.png" alt="logo image" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCart}>Cart({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}

export default Header;
