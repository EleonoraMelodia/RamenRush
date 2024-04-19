import React, { createContext, useReducer } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  type: string;
  quantity: number; 
};

type CartContextType = {
  items: CartItem[]; 
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};


export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: (item: {}) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];

    if (existingItemIndex > -1) {
      console.log("adding another one of existing food");

      const existingItem = state.items[existingItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...state.items];
      if (updatedItems[existingItemIndex].quantity === 1) {
        updatedItems.splice(existingItemIndex, 1);
      } else {
        updatedItems[existingItemIndex].quantity -= 1;
      }
      return { ...state, items: updatedItems };
    }
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
};

const CartContextProvider = ({ children }) => {
  const [cart, dispatchActions] = useReducer(cartReducer, { items: [] });

  const addItem = (item: {}) => {
    dispatchActions({ type: "ADD_ITEM", item });
  };

  const removeItem = (id: string) => {
    dispatchActions({
      type: "REMOVE_ITEM",
      id,
    });
  };

  const clearCart = (state, action) => {
    dispatchActions({
      type: "CLEAR_CART",
    });
  };

  const contextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
