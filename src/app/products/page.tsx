import React from "react";
import FetchProductClient from "./FetchProductClient";
import { Suspense } from "react";

const ProductPage = () => {
  return (
    <div className="px-4 ">
      <Suspense fallback={<p>Loading...</p>}>
        <h1 className="font-bold text-3xl text-center my-4">
          Product for Client
        </h1>
        <FetchProductClient />
      </Suspense>
    </div>
  );
};

export default ProductPage;
