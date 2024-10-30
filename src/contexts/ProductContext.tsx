"use client";

import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";
import { ReactNode } from "react";

interface Author {
  name: string;
}
interface Product {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  published: boolean;
  author: Author;
}

interface ProductContextType {
  product: Product[];
  fetchProduct: () => void;
}

interface ProductProviderType {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: ProductProviderType) => {
  const [product, setProduct] = useState<Product[]>([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get("/api/product");
      setProduct(res.data);
    } catch (error) {
      console.log("error fetch dari usecontext", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <ProductContext.Provider value={{ product, fetchProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
