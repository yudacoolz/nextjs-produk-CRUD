// "use client";
import React from "react";
import ProductComponent from "./product";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Product = () => {
  return (
    <>
      <ProtectedRoute>
        <ProductComponent />
      </ProtectedRoute>
    </>
  );
};

export default Product;
