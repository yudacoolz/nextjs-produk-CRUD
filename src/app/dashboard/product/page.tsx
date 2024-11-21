import React from "react";
import ProductComponent from "./product";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Suspense } from "react";

const Product = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <ProtectedRoute>
          <ProductComponent />
        </ProtectedRoute>
      </Suspense>
    </>
  );
};

export default Product;
