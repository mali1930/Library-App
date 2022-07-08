import React, { useContext } from "react";
import CartContext from "../useContextProvider/CartContext";

const Search = () => {
  const { searchProducts, sortBooks } = useContext(CartContext);
  return (
    <>
      <div className="flex md:flex-row max-w-full mt-6  items-center justify-center justify-around  justify-between space-y-6 flex-col items-center">
        <input
          type="search"
          onChange={(e) => searchProducts(e.target.value)}
          placeholder="Search..."
          className="px-3 py-2 items-center mt-6 md:w-[550px] w-[300px] "
        />
        <select
          onChange={(e) => sortBooks(e.target.value)}
          className="px-3 py-3 md:w-[370px] w-[300px]"
        >
          <option>Sort</option>
          <option value="1">Price,High-low</option>
          <option value="2">Price,low-high</option>
          <option value="3">Rating</option>
        </select>
      </div>
    </>
  );
};

export default Search;
