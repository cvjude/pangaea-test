import React, { createContext, useState, useEffect } from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

export const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = cart.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

    setTotalPrice(price);
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemExits = prevCart.find((cartItems) => cartItems.id === item.id);

      if (itemExits)
        return prevCart.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...item, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item, remove = false) => {
    setCart((prevCart) => {
      const itemExits = prevCart.find((cartItems) => cartItems.id === item.id);

      if (itemExits && itemExits.quantity > 1 && !remove)
        return prevCart.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...item, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });

      return prevCart.filter((cartItem) => cartItem.id !== item.id);
    });
  };

  // runs if the user changes the currency
  const updateCurrency = (products) => {
    setCart((prevCart) => {
      // create an Id map of the products
      const productMap = products.reduce((acc, productItem) => {
        return { ...acc, [productItem.id]: productItem };
      }, {});

      // create an Id map of the products
      const cartMap = prevCart.reduce((acc, cartItem) => {
        return { ...acc, [cartItem.id]: cartItem };
      }, {});

      return Object.keys(cartMap).map((cartId) => {
        return { ...productMap[cartId], quantity: cartMap[cartId].quantity };
      });
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalPrice, updateCurrency }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
