import React from "react";

function Cart({ items, handleQuantity }) {
  let totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  let formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  return (
    <div id="cart">
      {items.length <= 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            let formattedPrice = `$${item.price.toFixed(2)}`;
            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span>({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={()=>{handleQuantity(item.id, -1)}}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={()=>{handleQuantity(item.id, +1)}}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}

export default Cart;
