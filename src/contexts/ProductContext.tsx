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
  fetchProduct: (
    query?: string,
    published?: string,
    author?: string,
    page?: string,
    backToPage1?: boolean
  ) => void;
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
  // const params = new URLSearchParams();
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const currentPage = Number(searchParams.get("page")) || 1;

  const { replace } = useRouter();

  // kita st default nya false supaya ga balik ke page 1. baliknya kalau di kasi nilai true aja kek di creeateProduct
  const fetchProduct = useCallback(
    async (
      query?: string,
      // published?: string,
      published: string = "true", // Default to true
      author?: string,
      page?: string,
      backToPage1: boolean = false
    ) => {
      try {
        const params = new URLSearchParams();

        console.log("backToPage1", backToPage1);
        console.log("page", page);

        const currentPage = page;

        //use this karena balik mulu ke page 1 tiap kali mau update, delete. kecuali utk create
        const pageToFetch = backToPage1 ? 1 : currentPage || 1;
        console.log("pageToFetch", pageToFetch);

        // const query = params.get("query") || "";
        // const published = params.get("published") || "";
        // const author = params.get("author") || "";

        // // Build the API URL with query parameters
        const apiUrl = `/api/product?page=${pageToFetch}&query=${query}&published=${published}&author=${author}`;

        console.log("API URL:", apiUrl);

        // // Make the API call
        const res = await axios.get(apiUrl);

        // const res = await axios.get(`/api/product?page=${pageToFetch}`);
        const { products, totalCount } = res.data;

        setProduct(products);
        setTotalPages(Math.ceil(totalCount / 4)); // Update `totalPages`
        // Update URL params and currentPage state
        params.set("page", pageToFetch.toString());
        replace(`${pathname}?${params.toString()}`);
      } catch (error) {
        console.log("error fetch dari usecontext", error);
      }
    },
    []
  );

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
