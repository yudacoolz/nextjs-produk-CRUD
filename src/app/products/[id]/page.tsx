// app/products/[id]/page.tsx
"use client";
import axios from "axios";
import { useState, useEffect } from "react";

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

interface ProductDetailProps {
  params: { id: string }; // ID from the URL
}

const ProductDetail = ({ params }: ProductDetailProps) => {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]); // `id` as a dependency

  return (
    <div className="p-4">
      {product ? (
        <div>
          <h2>{product.id}</h2>
          <h2>{product.title}</h2>
          <p>{product.content}</p>
          <p>Price: ${product.authorId}</p>
          <p>Author name: {product.author.name}</p>
          <div className="flex gap-2 my-5">
            {product.ImageUrl.map((image, i) => (
              <img
                key={i}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Product Image ${i + 1}`}
                className="object-cover rounded-sm w-20 h-20 border-2"
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductDetail;
