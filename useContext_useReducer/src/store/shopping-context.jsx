import { createContext, useReducer } from "react";
import { Dummy_Products } from "../dummy-products";

export const UserContext = createContext({
  items: [],
  addToCart: () => {},
  updateQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEMS") {
    let updatedItems = [...state.items];
    let existingCartItemIndex = updatedItems.findIndex(
      (itemIndex) => itemIndex.id === action.payload
    );
    let existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      let updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      let product = Dummy_Products.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    return {
      ...state, // not needed here because we have only one value
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEMS") {
    let updatedItems = [...state.items];
    let updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.product
    );

    let updatedItem = {
      ...updatedItems[updatedItemIndex],
    };
    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }
    return {
      ...state, // not needed here because we have only one value
      items: updatedItems,
    };
  }
}

export default function UserContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  function handleAddToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEMS",
      payload: id,
    });
  }

  function handleUpdateQuantity(product, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEMS",
      payload: {
        product,
        amount,
      },
    });
  }

  let userContextValue = {
    items: shoppingCartState.items,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
