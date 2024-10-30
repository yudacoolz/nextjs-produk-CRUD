"use client";

import React from "react";
// import FetchProductComponent from "./FetchProductComponent";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useProductContext } from "@/contexts/ProductContext";

interface Author {
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  published: boolean;
  author: Author;
}

interface DateOptions extends Intl.DateTimeFormatOptions {
  year: "numeric";
  month: "long";
  day: "numeric";
}

interface FetchProductComponentProps {
  posts: Post[];
  dateOptions: DateOptions;
}
// export const FetchProductComponent = ({
//   posts,
//   dateOptions,
// }: FetchProductComponentProps) => {
export const FetchProductComponent = () => {
  const { product, fetchProduct } = useProductContext();
  // const [product, setProduct] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [updateID, setUpdateID] = useState<number | null>(null);
  const [updatedata, setUpdateData] = useState<Post | null>(null);
  const [deleteData, setDeleteData] = useState<Post>();

  // const fetchProduct = async () => {
  //   try {
  //     const res = await axios.get("/api/product");
  //     const data = res.data;
  //     setProduct(data);
  //   } catch (error) {
  //     console.error("Error fetching product:", error);
  //   }
  // };
  useEffect(() => {
    fetchProduct();
  }, []);

  console.log("data post:", product);

  const handleUpdate = (id: number) => {
    setIsModalOpen(true);
    console.log(isModalOpen);
    const selectedProduct = product.find((item) => item.id === id);
    setUpdateData(selectedProduct || null);
  };

  const handleDelete = (id: number) => {
    setIsModalOpen(true);
    const SelectedProduct = product.find((item) => item.id === id);
    setDeleteData(SelectedProduct);
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {product.length > 0 ? (
        product.map((post) => (
          <div
            key={post.id}
            className="rounded-lg border my-3 p-3 w-full bg-slate-700 text-white"
          >
            <p>id: {post.id}</p>
            <p>title: {post.title}</p>
            <p>description : {post.content}</p>
            <p>created : {new Date(post.createdAt).toLocaleDateString()}</p>
            <p>updated : {new Date(post.updatedAt).toLocaleDateString()}</p>
            {/* <p>
              updated :{" "}
              {post.updatedAt.toLocaleDateString("id-ID", dateOptions)}
            </p> */}
            <p>authorID: {post.authorId}</p>
            <p>author name: {post.author.name}</p> {/* This should work now */}
            <p>Publish : {post.published ? "TRUE" : "FALSE"}</p>
            <div className="flex gap-2 mt-5">
              <button
                className="bg-green-700 p-2 rounded-lg"
                onClick={() => handleUpdate(post.id)}
              >
                Update
              </button>
              <button
                className="bg-red-700 p-2 rounded-lg"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading....</p>
      )}
      <Modal
        Judul="Update Product"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        updateData={updatedata}
        deleteData={deleteData}
        onAction={() => fetchProduct()}
      />
    </div>
  );
};

export default FetchProductComponent;
