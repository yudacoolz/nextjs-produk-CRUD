"use client";

import axios from "axios";
import { useState, useContext, createContext, useCallback } from "react";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

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
  ImageUrl: string[];
}

interface ProductContextType {
  product: Product[];
  fetchProduct: () => void;
  fetchFilteredProduct: (
    query: string,
    published?: string,
    author?: string,
    page?: string
  ) => Promise<void>; // kalau dia udah main async await, tambahin promise
  totalPages: number;
}

interface ProductProviderType {
  children: ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: ProductProviderType) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const params = new URLSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios.get("/api/product");
      const { products, totalCount } = res.data;

      setProduct(products);
      setTotalPages(Math.ceil(totalCount / 4)); // Update `totalPages`
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    } catch (error) {
      console.log("error fetch dari usecontext", error);
    }
  }, []);

  // const fetchFilteredProduct = useCallback(async (query: string) => {
  //   try {
  //     const response = await axios.get(`/api/product?query=${query}`);
  //     setProduct(response.data);
  //   } catch (error) {
  //     console.error("Error fetching filtered products:", error);
  //   }
  // }, []);
  const fetchFilteredProduct = useCallback(
    async (
      query?: string,
      published?: string,
      author?: string,
      page?: string
    ) => {
      try {
        // const router = useRouter();
        // Build the query string with all parameters
        const params = new URLSearchParams();

        if (query) params.append("query", query);
        if (published) params.append("published", published);
        if (author) params.append("author", author);

        params.append("page", page || "1");

        // Construct URL without modifying if no change is necessary
        const newUrl = `${pathname}?${params.toString()}`;
        if (newUrl !== window.location.href) {
          replace(newUrl);
        }

        // Make the API request with the constructed query string
        // Adjust to handle products and totalCount separately
        const response = await axios.get(`/api/product?${params.toString()}`);
        const { products, totalCount } = response.data;

        setProduct(products);
        setTotalPages(Math.ceil(totalCount / 4)); // Update `totalPages`

        // replace(`${pathname}?${params.toString()}`);
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    },
    [pathname]
  );

  // useEffect(() => {
  //   fetchProduct();
  // }, []);

  return (
    <ProductContext.Provider
      value={{ product, fetchProduct, fetchFilteredProduct, totalPages }}
    >
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
