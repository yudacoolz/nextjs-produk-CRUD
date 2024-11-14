import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useProductContext } from "@/contexts/ProductContext";

interface ProductData {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
  ImageUrl: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  Judul: string;
  children?: React.ReactNode; // Added children prop for modal content
  updateData?: ProductData | null;
  deleteData?: ProductData;
  onAction: () => void;
}

export const Modal = ({
  isOpen,
  onClose,
  Judul,
  updateData,
  deleteData,
  onAction,
  children,
}: ModalProps) => {
  const { product } = useProductContext();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [authorId, setAuthorId] = useState<number | "">("");
  const [images, setImages] = useState<string[] | null>(null);
  const [closeModal, setCloseModal] = useState<boolean>(true);

  console.log("updateData ? : ", updateData);

  useEffect(() => {
    if (updateData) {
      setTitle(updateData.title || "");
      setContent(updateData.content || "");
      setPublished(updateData.published || false);
      setAuthorId(updateData.authorId || "");
      setImages(updateData.ImageUrl || null);
    } else if (deleteData) {
      setTitle(deleteData.title || "");
    }
  }, [updateData, deleteData]);

  if (!isOpen) return null;

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      console.log("Images selected:", filesArray);

      // Convert new images to base64
      const newBase64Images = await Promise.all(
        filesArray.map((image) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          return new Promise<string>((resolve, reject) => {
            reader.onloadend = () => {
              if (reader.result !== null) {
                resolve((reader.result as string).split(",")[1]);
              } else {
                reject(new Error("Failed to read image"));
              }
            };
          });
        })
      );

      // Store newly selected images in newImages state
      // setNewImages((prevNewImages) => [...prevNewImages, ...newBase64Images]);
      setImages((prevImages) =>
        prevImages ? [...prevImages, ...newBase64Images] : newBase64Images
      );
      console.log("FInal Updated images:", images); // Log updated images here
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCloseModal(true);

    if (title || content || authorId || published || images) {
      try {
        const res = await axios.patch(`/api/product/${updateData?.id}`, {
          id: updateData?.id,
          title,
          content,
          published,
          authorId,
          ImageUrl: images,
        });
        console.log("hasil update", res);
        if (closeModal) {
          alert("berhasil di update");
          onClose();
        }
        onAction();
        return res;
      } catch (error) {
        console.log("error", error);
        alert("error update bang");
      }
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/product/${deleteData?.id}`, {
        data: { id: deleteData?.id }, // Sending the ID in the request body
      });
      onClose();
      onAction();
    } catch (err) {
      console.log("error delete dr modal", err);
      alert("error delete dr modal");
    }
  };

  const handleDeleteImage = (index: number) => {
    // kenapa butuh 2 ? krn yang kita butuhin itu adalah index item nya. bukan current item nya
    setImages(
      (prevImages) => prevImages?.filter((item, i) => i !== index) || null
    );
    setCloseModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg w-full max-w-2xl mx-4 z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{Judul}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {updateData ? (
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 bg-slate-700 rounded-lg p-3 my-2 text-white"
              >
                <p>ID : {updateData.id}</p>
                <div className="flex gap-2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-black"
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="content">Content</label>
                  <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="text-black"
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="published">Published</label>
                  <input
                    type="checkbox"
                    name="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="text-black"
                  />
                </div>
                <div className="flex gap-2">
                  <label htmlFor="authorId">Author ID</label>
                  <input
                    type="number"
                    name="authorId"
                    value={authorId}
                    onChange={(e) => setAuthorId(Number(e.target.value))}
                    className="text-black"
                  />
                </div>

                <div className="flex gap-2">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    name="image"
                    multiple
                    // accept=".jpg,.jpeg,.png"
                    accept=".jpeg"
                    onChange={handleImage}
                    className="text-black"
                  />
                </div>

                <div className="mt-5">
                  {product.length > 0 ? (
                    // Find the product with the matching `updateData.id`
                    (() => {
                      const selectedProduct = product.find(
                        (item) => item.id === updateData.id
                      );
                      return selectedProduct ? (
                        <div
                          key={selectedProduct.id}
                          className="flex gap-2 mx-2 flex-wrap"
                        >
                          {selectedProduct.ImageUrl.map((image, i) => (
                            <div key={i} className="relative w-32 h-32">
                              {/* Delete Button */}
                              <button
                                onClick={() => handleDeleteImage(i)}
                                className="absolute top-1 right-1 bg-red-600 text-white p-[-10px] w-6 h-6 rounded-full z-10 hover:bg-red-700"
                              >
                                &times;
                              </button>
                              {/* Image */}
                              <img
                                src={`data:image/jpeg;base64,${image}`}
                                alt={`Image Produk ${i + 1}`}
                                className="object-cover rounded-sm w-full h-full border-2"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No Images</p>
                      );
                    })()
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="p-2 bg-green-700 text-white rounded-lg w-fit"
                >
                  Update Product
                </button>
              </form>
            </div>
          ) : deleteData ? (
            <>
              <form onSubmit={handleDelete}>
                <h3>
                  Delete {deleteData.title} ID nya {deleteData.id}
                </h3>
                <button
                  type="submit"
                  className="p-2 bg-green-700 text-white rounded-lg w-fit"
                >
                  {" "}
                  Delete
                </button>
              </form>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
