"use client";
import axios from "axios";
import React, { useState } from "react";
import { useProductContext } from "@/contexts/ProductContext";

export const CreateProduct = () => {
  const { fetchProduct } = useProductContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [authorId, setAuthorId] = useState<number | "">("");
  console.log("title udh masuk ? : ", title);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title && content && authorId) {
      try {
        const response = await axios.post("/api/product", {
          title,
          content,
          published,
          authorId: Number(authorId),
        });
        console.log("responseee", response);

        if (!response) {
          const errorData = await response;
          console.error("Failed to create product:", errorData);
          alert("Failed to create product.");
        } else {
          const result = await response;
          alert("Product created successfully!");
          console.log("Product created:", result);
          await fetchProduct();
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
      }
    }

    //   if (response.ok) {
    //     alert("Product created successfully!");
    //     setTitle("");
    //     setContent("");
    //     setPublished(false);
    //     setAuthorId("");
    //   } else {
    //     alert("Failed to create product.");
    //   }
    // } else {
    //   alert("Please fill in all required fields.");
    // }
  };

  return (
    <div>
      <h1>Create Product</h1>

      <div className="my-2 p-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 bg-slate-700 rounded-lg p-3 my-2 text-white"
        >
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
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
