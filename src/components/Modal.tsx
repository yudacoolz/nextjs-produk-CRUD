import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface ProductData {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
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
  if (!isOpen) return null;

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);
  const [authorId, setAuthorId] = useState<number | "">("");
  console.log("title udh masuk ? : ", title);

  useEffect(() => {
    if (updateData) {
      setTitle(updateData.title || "");
      setContent(updateData.content || "");
      setPublished(updateData.published || false);
      setAuthorId(updateData.authorId || "");
    } else if (deleteData) {
      setTitle(deleteData.title || "");
    }
  }, [updateData, deleteData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title || content || authorId || published) {
      try {
        const res = await axios.patch(`api/product/${updateData?.id}`, {
          id: updateData?.id,
          title,
          content,
          authorId,
          published,
        });
        console.log("hasil update", res);
        alert("berhasil di update");
        onClose();
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
      await axios.delete(`api/product/${deleteData?.id}`, {
        data: { id: deleteData?.id }, // Sending the ID in the request body
      });
      onClose();
      onAction();
    } catch (err) {
      console.log("error delete dr modal", err);
      alert("error delete dr modal");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4 z-50">
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
