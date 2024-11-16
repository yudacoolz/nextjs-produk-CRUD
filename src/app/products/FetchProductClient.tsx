"use client";

import React from "react";
// import FetchProductComponent from "./FetchProductComponent";
import ModalImages from "@/components/ModalImages";
import { useState, useEffect, Suspense } from "react";
import { useProductContext } from "@/contexts/ProductContext";
import SearchFilter from "@/components/SearchFilter";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  ImageUrl: string[];
}

const FetchProductClient = () => {
  const { product, fetchFilteredProduct, totalPages } = useProductContext();

  const [isModalImageOpen, setIsModalImageOpen] = useState(false);

  const [dataImage, setDataImage] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true); // loading state

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const published = searchParams.get("published") || "";
  const author = searchParams.get("author") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    // Call fetchFilteredProduct if there is a search term; otherwise, call fetchProduct
    // if (searchTerm) {
    //   fetchFilteredProduct(searchTerm, published, author, page);
    // } else {
    //   fetchProduct();
    // }
    setLoading(true);
    const checkResult = () => {
      fetchFilteredProduct(searchTerm, published, author, page);
      setLoading(false);
    };
    checkResult();
  }, [searchTerm]);

  console.log("data post:", product);

  // const handleUpdate = (id: number) => {
  //   setIsModalOpen(true);
  //   console.log(isModalOpen);
  //   const selectedProduct = product.find((item) => item.id === id);
  //   setUpdateData(selectedProduct || null);
  // };

  // const handleDelete = (id: number) => {
  //   setIsModalOpen(true);
  //   const SelectedProduct = product.find((item) => item.id === id);
  //   setDeleteData(SelectedProduct);
  // };

  const handleModalImage = (id: number) => {
    setIsModalImageOpen(true);
    const Selecteddata = product.find((item) => item.id === id);
    setDataImage(Selecteddata || null);
  };

  return (
    <Suspense fallback={<p>Loading product data...</p>}>
      <div className="mb-5">
        <SearchFilter placeholder={"Search Produk"} />

        <div className="grid grid-cols-4 gap-2">
          {loading ? (
            <p>.... Loading Data</p>
          ) : product.length > 0 ? (
            product.map((post) => (
              <div
                className="rounded-lg border my-3 p-3 w-full bg-slate-700 text-white h-full"
                key={post.id}
              >
                <Link href={`/products/${post.id}`}>
                  <p>id: {post.id}</p>
                  <p>title: {post.title}</p>
                  <p>description : {post.content}</p>
                  <p>
                    created : {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    updated : {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                  {/* <p>
              updated :{" "}
              {post.updatedAt.toLocaleDateString("id-ID", dateOptions)}
            </p> */}
                  <p>authorID: {post.authorId}</p>
                  <p>author name: {post.author.name}</p>{" "}
                  {/* This should work now */}
                  <p>Publish : {post.published ? "TRUE" : "FALSE"}</p>
                </Link>
                {/* images */}
                <div className="flex flex-col gap-2 mt-5">
                  <p>Total Images: {post.ImageUrl.length}</p>
                  <div
                    className="flex gap-2 my-4 cursor-pointer"
                    onClick={() => handleModalImage(post.id)}
                  >
                    {post.ImageUrl.slice(0, 2).map((image, i) => (
                      <img
                        key={i}
                        src={`data:image/jpeg;base64,${image}`}
                        alt={`Image Produk ${i + 1}`}
                        className="object-cover rounded-sm w-20 h-20 border-2"
                      />
                    ))}

                    {post.ImageUrl.length > 2 && (
                      <div className="flex items-center justify-center rounded-sm w-20 h-20 border-2 bg-gray-200 text-gray-700">
                        +{post.ImageUrl.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
                {/* end images */}
                {/* <div className="flex gap-2 mt-5">
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
              </div> */}
                <div className="text-right w-full">
                  <Link
                    href={`/products/${post.id}`}
                    key={post.id}
                    className="my-10 rounded-lg border p-3 w-full bg-green-700 text-white"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No data was Found</p>
          )}
          {/* <Modal
          Judul="Update Product"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          updateData={updatedata}
          deleteData={deleteData}
          onAction={() => fetchProduct()}
        /> */}
          <ModalImages
            Judul="Images Product"
            isOpen={isModalImageOpen}
            onClose={() => setIsModalImageOpen(false)}
            updateData={dataImage}
          />
        </div>
        <Pagination
          query={searchTerm}
          published={published}
          author={author}
          totalPages={totalPages}
        />
      </div>
    </Suspense>
  );
};

export default FetchProductClient;
