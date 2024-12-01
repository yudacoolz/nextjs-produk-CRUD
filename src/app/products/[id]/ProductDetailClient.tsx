// components/ProductDetailClient.tsx
"use client"; // Enable client-side features

import { useState } from "react";
import ModalImages from "@/components/ModalImages";

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

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [dataImage, setDataImage] = useState<Product | null>(null);

  const handleModalImage = () => {
    setIsModalImageOpen(true);
    setDataImage(product || null);
  };

  return (
    <div className="md:px-32 px-4 flex gap-5 md:flex-row flex-col justify-between">
      <div className="md:w-1/2">
        <h2 className="text-5xl font-bold capitalize">{product.title}</h2>
        <p className="text-lg mt-4 text-slate-600 font-semibold">
          Author name: {product.author.name}
        </p>
        <p>Created at: {new Date(product.createdAt).toLocaleDateString()}</p>
        <p className="text-lg mt-4">
          <span className="font-semibold text-lg">Description:</span>
          <br />
          {product.content}
        </p>
      </div>

      <div className="flex flex-col gap-2 my-5 md:w-1/2">
        <p className="font-semibold md:text-right">
          Total Images: {product.ImageUrl.length}
        </p>
        <div
          className="flex flex-col items-end gap-2 mt-2 cursor-pointer"
          onClick={() => handleModalImage()}
        >
          {/* {product.ImageUrl.slice(0, 3).map((image, i) => (
            <img
              key={i}
              src={`data:image/jpeg;base64,${image}`}
              alt={`Product Image ${i + 1}`}
              className="object-cover rounded-xl md:w-3/4 w-full h-full border-2"
              onClick={() => handleModalImage(image)}
            />
          ))} */}
          <img
            src={`data:image/jpeg;base64,${product.ImageUrl[0]}`}
            alt="Product Image 1"
            className="object-cover rounded-xl md:w-3/4 w-full h-full border-2"
          />
          <div className="flex gap-2 self-start md:self-end">
            {product.ImageUrl.slice(0, 3).map((image, i) => (
              <img
                key={i}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Image Produk ${i + 1}`}
                className="object-cover rounded-xl w-20 h-20 border-2"
                onClick={() => handleModalImage()}
              />
            ))}

            {product.ImageUrl.length > 2 && (
              <div className="flex items-center justify-center rounded-sm w-20 h-20 border-2 bg-gray-200 text-gray-700">
                +{product.ImageUrl.length - 2} more
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalImages
        Judul="Product Images"
        isOpen={isModalImageOpen}
        onClose={() => setIsModalImageOpen(false)}
        updateData={dataImage}
      />
    </div>
  );
};

export default ProductDetailClient;
