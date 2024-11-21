"use client";
import React from "react";
import FetchProductComponent from "./FetchProductComponent";
import { CreateProduct } from "./CreateProduct";
import { Suspense } from "react";
import { useState } from "react";

const ProductComponent = () => {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="mt-4 px-4">
        <h1 className="text-4xl font-bold mt-4">Dashboard Product</h1>

        <div className="my-2">
          <button
            className="text-xl font-semibold bg-green-600 p-2 rounded-lg text-white"
            onClick={() => setShowCreate(!showCreate)}
          >
            {showCreate ? "Close" : "Create"} Product
          </button>

          {showCreate && <CreateProduct />}
        </div>

        {/* CONTENT */}
        <FetchProductComponent />
      </div>
    </Suspense>
  );
};

export default ProductComponent;
