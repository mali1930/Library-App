import React, { createContext, useState, useEffect } from "react";
import data from "../data";

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [Books, setBooks] = useState([]);
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    setBooks(data);
  }, []);

  //sort
  const sortBooks = (value) => {
    if (value == 1) {
      const r1 = data.sort((a, b) => b.price - a.price);
      setBooks(r1);
    } else if (value == 2) {
      const r2 = data.sort((a, b) => a.price - b.price);
      setBooks(r2);
    } else {
      const r3 = data.sort((a, b) => b.rating - a.rating);
      setBooks(r3);
    }
  };

  //search
  const searchProducts = (text) => {
    //set loading true
    if (text.trim() == "" || !text) {
      // set loading to false
    } else {
      setBooks(Books);
      const searchedProducts = data.filter(
        (item) =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.description.toLowerCase().includes(text.toLowerCase())
      );

      // console.log(searchedProducts);
      setBooks(searchedProducts);
      // set loading false
    }
  };
  const handleAddToCart = ({ id, price, img, qty, title, rating }) => {
    const exist = cartBooks.find((item) => item.id === id);
    if (exist) return alert("Item is already added to cart");
    else
      return setCartBooks([
        ...cartBooks,
        { id, price, img, qty, title, rating },
      ]);
  };
  const addQty = (id) => {
    const add = cartBooks.map((item) => {
      if (item.id === id) item.qty++;
      return item;
    });

    setCartBooks(add);
  };

  const subQty = (id) => {
    const remove = cartBooks.filter((item) => item.id !== id);
    setCartBooks(remove);
  };
  const handleDecrease = (id) => {
    const decrease = cartBooks.map((item) => {
      if (item.id === id) {
        if (item.qty > 1) {
          item.qty--;
        }
      }
      return item;
    });
    setCartBooks(decrease);
  };

  const removeAll = () => {
    setCartBooks("");
  };
  return (
    <CartContext.Provider
      value={{
        Books,
        handleAddToCart,
        cartBooks,
        addQty,
        subQty,
        handleDecrease,
        removeAll,
        searchProducts,
        sortBooks,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export { CartContextProvider };
export default CartContext;
