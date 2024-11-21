"use client";

import React from "react";
// import FetchProductComponent from "./FetchProductComponent";
import Modal from "@/components/Modal";
import ModalImages from "@/components/ModalImages";
import { useState, useEffect } from "react";
import { useProductContext } from "@/contexts/ProductContext";
import SearchFilter from "@/components/SearchFilter";
import { useSearchParams } from "next/navigation";
import PaginationComponent from "@/components/Pagination";
import { Suspense } from "react";

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

const FetchProductComponent = () => {
  const { fetchFilteredProduct, product, totalPages, fetchProduct } =
    useProductContext();
  // const [product, setProduct] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  // const [updateID, setUpdateID] = useState<number | null>(null);
  const [updatedata, setUpdateData] = useState<Post | null>(null);
  const [dataImage, setDataImage] = useState<Post | null>(null);
  const [deleteData, setDeleteData] = useState<Post>();
  const [loading, setLoading] = useState(true); // loading state

  const searchParams = useSearchParams();
  // const searchTerm = searchParams.get("query") || "published" || "author" || "";
  // const typeSearchTerm = typeof searchParams;
  // console.log("tipe nya : ", typeSearchTerm);
  // console.log("hasil nya : ", searchTerm);

  const query = searchParams.get("query") || "";
  const published = searchParams.get("published") || "";
  const author = searchParams.get("author") || "";
  const page = searchParams.get("page") || "1";
  console.log("totalPages", totalPages);

  useEffect(() => {
    setLoading(true);
    const checkResult = async () => {
      // Call fetchFilteredProduct with all parameters
      await fetchFilteredProduct(query, published, author, page);
      setLoading(false);
    };
    checkResult();
  }, [searchParams]);

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

  const handleModalImage = (id: number) => {
    setIsModalImageOpen(true);
    const Selecteddata = product.find((item) => item.id === id);
    setDataImage(Selecteddata || null);
  };

  return (
    <Suspense fallback={<p>Loading product data...</p>}>
      <div className="mb-5">
        <SearchFilter placeholder={"Search Produk"} isDashboard />

        <div className="overflow-x-auto">
          <table className="table-auto w-full mt-6 text-center">
            <thead>
              <tr className="capitalize border bg-slate-700 text-white">
                <th className="border-2 border-white p-2">id</th>
                <th className="border-2 border-white p-2">title</th>
                <th className="border-2 border-white p-2">description</th>
                <th className="border-2 border-white p-2">created</th>
                <th className="border-2 border-white p-2">updated</th>
                <th className="border-2 border-white p-2">authorID</th>
                <th className="border-2 border-white p-2">author name</th>
                <th className="border-2 border-white p-2">published</th>
                <th className="border-2 border-white p-2  min-w-[300px] overflow-hidden">
                  images
                </th>
                <th className="border-2 border-white p-2">action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <p>Loading...</p> // Show loading message while fetching data
              ) : product.length > 0 ? (
                product.map((post) => (
                  <tr
                    key={post.id}
                    className="rounded-lg border my-3 p-3 w-full bg-slate-50 "
                  >
                    <td className="border-2 border-slate-700 p-2">{post.id}</td>
                    <td className="border-2 border-slate-700 p-2">
                      {post.title}
                    </td>
                    <td className="border-2 border-slate-700 p-2">
                      {post.content}
                    </td>
                    <td className="border-2 border-slate-700 p-2">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border-2 border-slate-700 p-2">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="border-2 border-slate-700 p-2">
                      {post.authorId}
                    </td>
                    <td className="border-2 border-slate-700 p-2">
                      {post.author.name}
                    </td>
                    <td className="border-2 border-slate-700 p-2">
                      {post.published ? "TRUE" : "FALSE"}
                    </td>
                    <td className="border-2 border-slate-700 p-2 min-w-[300px] overflow-hidden">
                      {/* images */}
                      <div className="flex flex-col gap-2 my-5">
                        <p>Total Images: {post.ImageUrl.length}</p>
                        <div
                          className="flex gap-2 mt-5 cursor-pointer"
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
                    </td>
                    <td className="border-2 border-slate-700 p-2">
                      <div className="flex md:flex-row flex-col gap-2 mt-5">
                        <button
                          className="bg-green-700 text-white p-2 rounded-lg"
                          onClick={() => handleUpdate(post.id)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-700 text-white p-2 rounded-lg"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="p-4">
                    No post Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* GRID VERSION */}
        {/* <div className="grid grid-cols-4 gap-2">
          {loading ? (
            <p>Loading...</p>
          ) : product.length > 0 ? (
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
                <p>authorID: {post.authorId}</p>
                <p>author name: {post.author.name}</p>{" "}
                <p>Publish : {post.published ? "TRUE" : "FALSE"}</p>
                <div className="flex flex-col gap-2 mt-5">
                  <p>Total Images: {post.ImageUrl.length}</p>
                  <div
                    className="flex gap-2 mt-5 cursor-pointer"
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
            <p>No post Found</p>
          )}
        </div> */}
        {/* END GRID VERSION */}

        <Modal
          Judul="Update Product"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          updateData={updatedata}
          deleteData={deleteData}
          onAction={() => fetchProduct(query, published, author, page, false)}
        />
        <ModalImages
          Judul="Images Product"
          isOpen={isModalImageOpen}
          onClose={() => setIsModalImageOpen(false)}
          updateData={dataImage}
        />

        <PaginationComponent
          query={query}
          published={published}
          author={author}
          totalPages={totalPages}
        />
      </div>
    </Suspense>
  );
};

export default FetchProductComponent;
