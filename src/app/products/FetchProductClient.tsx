"use client";

import React from "react";
// import FetchProductComponent from "./FetchProductComponent";
// import ModalImages from "@/components/ModalImages";
import { useState, useEffect, Suspense } from "react";
import { useProductContext } from "@/contexts/ProductContext";
import SearchFilter from "@/components/SearchFilter";
import PaginationComponent from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "@/app/globals.css";

// interface Author {
//   name: string;
// }

// interface Post {
//   id: number;
//   title: string;
//   content: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   authorId: number;
//   published: boolean;
//   author: Author;
//   ImageUrl: string[];
// }

const FetchProductClient = () => {
  const { product, fetchFilteredProduct, fetchProduct, totalPages } =
    useProductContext();

  // const [isModalImageOpen, setIsModalImageOpen] = useState(false);

  // const [dataImage, setDataImage] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true); // loading state

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const published = searchParams.get("published") || "";
  const author = searchParams.get("author") || "";
  const page = searchParams.get("page") || "";

  useEffect(() => {
    // Call fetchFilteredProduct if there is a search term; otherwise, call fetchProduct

    setLoading(true);
    const checkResult = async () => {
      if (searchTerm) {
        await fetchFilteredProduct(searchTerm, published, author, page);
      } else {
        if (page) {
          await fetchProduct("", "true", "", page.toString(), false, true);
        } else {
          await fetchProduct("", "true", "", page, false, false);
        }
      }
      setLoading(false);
    };
    checkResult();
  }, [searchTerm]);

  console.log("data post:", product);

  // const handleModalImage = (id: number) => {
  //   setIsModalImageOpen(true);
  //   const Selecteddata = product.find((item) => item.id === id);
  //   setDataImage(Selecteddata || null);
  // };

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [currentPost, setCurrentPost] = useState<number | null>(null);

  return (
    <Suspense fallback={<p>Loading product data...</p>}>
      <div className="mb-5">
        <SearchFilter placeholder={"Search Produk"} />

        <div className="grid md:grid-cols-4 gap-2">
          {loading ? (
            <p className="col-span-4 text-center my-5">.... Loading Data</p>
          ) : product.length > 0 ? (
            product.map((post) => (
              <div
                className="rounded-lg border-2 my-3 p-4 w-full h-full shadow-lg flex flex-col grow md:max-h-[420px]"
                key={post.id}
              >
                <p>Author : {post.author.name}</p>

                {/* versi lain`` */}
                <div
                  className="relative flex gap-2 my-2 cursor-pointer overflow-hidden"
                  // onClick={() => setCurrentPost(post.id)}
                >
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    className="w-[323px] md:h-56 h-full rounded-lg" //responsive
                  >
                    {post.ImageUrl.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`data:image/jpeg;base64,${image}`}
                          alt={`Slide ${index + 1}`}
                          className="object-cover rounded-lg border-2 min-w-[323px] md:min-h-56 h-full"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <Link href={`/products/${post.id}`}>
                  <h2 className="text-2xl font-semibold text-slate-500 capitalize">
                    {post.title}
                  </h2>
                  <p className="line-clamp-3 text-sm mb-5 mt-2">
                    {" "}
                    {post.content}
                  </p>
                </Link>

                <div className="text-right w-full mt-auto mb-4">
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

          {/* <ModalImages
            Judul="Images Product"
            isOpen={isModalImageOpen}
            onClose={() => setIsModalImageOpen(false)}
            updateData={dataImage}
          /> */}
        </div>
        <PaginationComponent
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
