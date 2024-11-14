import React from "react";
import { useState } from "react";
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
}

export const ModalImages = ({
  isOpen,
  onClose,
  Judul,
  updateData,
  children,
}: ModalProps) => {
  const { product } = useProductContext();
  const [selectedImage, setSelectedImage] = useState(String || null);
  console.log("product dari modal imagee", product);

  const selectedProduct = product.find((item) => item.id === updateData?.id);

  const handlezoom = (name: string) => {
    setSelectedImage(name);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity "
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg w-3/4  mx-4 z-50 max-h-full">
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
            <div className="flex flex-col gap-2">
              {selectedImage && (
                <div className="flex justify-center">
                  <img
                    src={`data:image/jpeg;base64,${selectedImage}`}
                    alt={`Image Produk`}
                    className=" rounded-sm w-auto h-96 border-2 cursor-pointer"
                  />
                </div>
              )}
              {product.length > 0 && selectedProduct && (
                <div key={selectedProduct.id} className="flex gap-3">
                  {selectedProduct.ImageUrl.map((item, i) => (
                    <img
                      key={i}
                      src={`data:image/jpeg;base64,${item}`}
                      alt={`Image Produk ${i + 1}`}
                      className="object-cover rounded-sm w-32 h-32 border-2 cursor-pointer"
                      onClick={() => handlezoom(item)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalImages;
