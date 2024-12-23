"use client";
import axios from "axios";
import React, { useState } from "react";
import { useProductContext } from "@/contexts/ProductContext";
import { useSearchParams } from "next/navigation";

export const CreateProduct = () => {
  const { product, fetchProduct } = useProductContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [authorId, setAuthorId] = useState<number | "">("");
  const [images, setImages] = useState<File[] | null>(null);
  console.log("authorId udh masuk ? : ", authorId);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const publish = searchParams.get("published") || "";
  const author = searchParams.get("author") || "";
  const page = searchParams.get("page") || "1";

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files)); // Convert FileList to arra
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(images);

    if (title && content && authorId) {
      try {
        if (images) {
          // 1. Change image to base64String
          const base64Images = await Promise.all(
            images.map((image) => {
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
          console.log("base64Images", base64Images);

          // 2. Sent them all
          const response = await axios.post("/api/product", {
            title,
            content,
            published,
            authorId: Number(authorId),
            ImageUrl: base64Images,
          });
          console.log("response", response);

          if (!response) {
            const errorData = await response;
            console.error("Failed to create product:", errorData);
            alert("Failed to create product.");
          } else {
            const result = await response;
            alert("Product created successfully!");
            console.log("Product created:", result);

            setTitle("");
            setContent("");
            setPublished(false);
            setAuthorId("");
            setImages(null);

            await fetchProduct(query, publish, author, page, true);
          }
        } else {
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="w-[350px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 bg-slate-700 rounded-lg p-3 my-2 text-white"
        >
          <div className="flex gap-2 ">
            <label className="w-1/4 font-semibold" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-black"
            />
          </div>
          <div className="flex gap-2">
            <label className="w-1/4 font-semibold" htmlFor="content">
              Content
            </label>
            <input
              type="text"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="text-black"
            />
          </div>
          <div className="flex gap-2">
            <label className="w-1/4 font-semibold" htmlFor="published">
              Published
            </label>
            <input
              type="checkbox"
              name="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="text-black"
            />
          </div>
          {/* <div className="flex gap-2">
            <label htmlFor="authorId">Author ID</label>
            <input
              type="number"
              name="authorId"
              value={authorId}
              onChange={(e) => setAuthorId(Number(e.target.value))}
              className="text-black"
            />
          </div> */}

          <div className="flex gap-2">
            <label className="w-1/4 font-semibold" htmlFor="authorIdselect">
              Author ID
            </label>
            <select
              name="authorIdselect"
              id="authorIdselect"
              value={authorId} // Bind the value of the select to authorId state
              onChange={(e) => setAuthorId(Number(e.target.value))} // Update the state on change
              className="text-black"
            >
              <option value="" disabled>
                Select an author
              </option>{" "}
              {/* Optional placeholder */}
              {product.length > 0 &&
                Array.from(new Set(product.map((item) => item.authorId))).map(
                  (authorId) => {
                    const author = product.find(
                      (item) => item.authorId === authorId
                    )?.author;
                    return (
                      <option key={authorId} value={authorId}>
                        {author ? author.name : "Unknown Author"}
                      </option>
                    );
                  }
                )}
            </select>
          </div>

          <div className="flex gap-2 w-full">
            <label className="w-1/4 font-semibold" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              name="image"
              multiple
              // accept=".jpg,.jpeg,.png"
              accept=".jpeg"
              onChange={handleImage}
              className="text-black ml-8"
            />
          </div>

          {/* <div className="mt-4">
            {images.length > 0 &&
              images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`uploaded-img-${i}`}
                  style={{ maxWidth: "100px", marginRight: "10px" }}
                />
              ))}
          </div> */}

          <button
            type="submit"
            className="p-2 px-4 bg-green-700 text-white rounded-lg w-fit mt-5 font-semibold"
          >
            Create Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
