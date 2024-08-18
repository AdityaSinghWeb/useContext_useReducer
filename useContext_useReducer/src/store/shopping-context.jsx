import { createContext, useState } from "react";
import { Dummy_Products } from "../dummy-products";

export const UserContext = createContext({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
});

export default function UserContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      let updatedItems = [...prevShoppingCart.items];
      let existingCartItemIndex = updatedItems.findIndex(
        (itemIndex) => itemIndex.id === id
      );
      let existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        let updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        let product = Dummy_Products.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }
      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateQuantity(product, amount) {
    setShoppingCart((prevShoppingCart) => {
      let updatedItems = [...prevShoppingCart.items];
      let updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === product
      );

      let updatedItem = {
        ...updatedItems[updatedItemIndex],
      };
      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
      };
    });
  }

  let userContextValue = {
    items: shoppingCart.items,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
