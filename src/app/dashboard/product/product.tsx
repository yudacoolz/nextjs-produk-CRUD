// // "use client";
// import { ProtectedRoute } from "@/components/ProtectedRoute";

// export default function LayoutProduct({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//       <ProtectedRoute>{children}</ProtectedRoute>
//     </>
//   );
// }

// "use client";
import React from "react";
import FetchProductComponent from "./FetchProductComponent";
import { CreateProduct } from "./CreateProduct";

const ProductComponent = () => {
  return (
    <>
      <div>
        <h1>Product</h1>

        <div className="my-2 p-2">
          <CreateProduct />
        </div>

        {/* CONTENT */}
        <FetchProductComponent />
      </div>
    </>
  );
};

export default ProductComponent;
