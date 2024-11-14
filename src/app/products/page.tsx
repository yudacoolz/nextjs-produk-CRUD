import React from "react";
import FetchProductClient from "./FetchProductClient";

const ProductPage = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center my-4">
        Product for Client
      </h1>
      <FetchProductClient />
    </div>
  );
};

export default ProductPage;
