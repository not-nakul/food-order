import { useReducer, useState } from "react";

import CartContext from "./store/cart-context";

import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import MainContent from "./components/Main Content/MainContent";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];

    let updatedItems;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR_CART") {
    return defaultCartState;
  }

  return defaultCartState;
}

function App() {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const [showCart, setShowCart] = useState(false);

  function cartAddItem(item) {
    dispatchCartState({ type: "ADD_ITEM", item });
  }

  function cartRemoveItem(id) {
    dispatchCartState({ type: "REMOVE_ITEM", id });
  }

  function toggleCart() {
    setShowCart((prev) => !prev);
  }

  function clearCart() {
    dispatchCartState({ type: "CLEAR_CART" });
  }

  const cartData = {
    showCart,
    toggleCart,
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    cartAddItem,
    cartRemoveItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartData}>
      {showCart && <Cart toggleCart={toggleCart} />}
      <Header />
      <MainContent />
    </CartContext.Provider>
  );
}

export default App;
