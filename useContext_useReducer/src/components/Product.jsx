import React from "react";
import { UserContext } from "../store/shopping-context";
import { useContext } from "react";

function Product({ id, image, title, price, description }) {
  const { addToCart } = useContext(UserContext);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <h3>{title}</h3>
        <p className="product-price">${price}</p>
        <p>{description}</p>
      </div>
      <p className="product-actions">
        <button onClick={() => addToCart(id)}>Add to Cart</button>
      </p>
    </article>
  );
}

export default Product;
