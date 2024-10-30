import React from "react";
import FetchProductComponent from "./FetchProductComponent";
// import { fetchProduct } from "../api/product/route";
import { CreateProduct } from "./CreateProduct";
import axios from "axios";

export type DateOptions = {
  year: "numeric";
  month: "long";
  day: "numeric";
};

export const Product = async () => {
  // const posts = await fetchProduct();

  // const posts = await axios.get("api/product");

  // console.log("data post : ", posts);

  const dateOptions: DateOptions = {
    // Options for formatting dates.
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <h1>Product</h1>

      <div className="my-2 p-2">
        <CreateProduct />
      </div>

      {/* CONTENT */}
      <FetchProductComponent />
    </div>
  );
};

export default Product;
