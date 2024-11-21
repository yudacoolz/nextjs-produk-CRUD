"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "@/app/globals.css";

export default function Home() {
  const images = ["/Images/images.jpeg", "/Images/cosmeticLS.jpg"]; // Add your images here

  return (
    <>
      {/* CAROUSEL */}
      <div className="relative flex gap-2 mb-2 cursor-pointer overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
          className="w-full md:h-72 rounded-lg" //responsive
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${image}`}
                alt={`Slide ${index + 1}`}
                className="object-cover rounded-lg border-2 w-full md:min-h-72 h-72"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* END CAROUSEL*/}

      <div className="mt-10 px-4 md:px-16">
        <div className="flex flex-col md:flex-row gap-4 mb-32">
          <div className="md:w-1/2 w-full">
            <Image
              className="w-full rounded-lg"
              src="/Images/model.jpg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
          </div>
          <div className="md:w-1/2 flex flex-col items-center justify-center md:items-start gap-2 px-4">
            <p className="text-center md:text-justify text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
              officia minima, ad libero at harum dolor quibusdam quod magni
              aliquid quas similique, delectus eveniet aliquam dolorum autem,
              repellendus et eum?
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis neque accusamus dicta corrupti, aliquam blanditiis
              dolorum ex necessitatibus aliquid maxime facilis dolores tenetur
              quidem vel. Quod libero voluptatum eius sequi.
            </p>
            <button className=" text-center md:text-justify bg-blue-600 text-white p-3 rounded-xl">
              Read More
            </button>
          </div>
        </div>
      </div>

      <div className="relative my-10 w-full">
        <Image
          className="w-full rounded-lg md:rounded-none h-56 object-cover" /* Added shadow */
          src="/Images/d_main.jpg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-80 rounded-lg md:rounded-none"></div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-3/4 text-white bg-black bg-opacity-70 flex flex-col md:flex-row md:justify-between items-center justify-center gap-4 p-4 rounded-lg">
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            nam praesentium.
          </p>
          <button className="text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all">
            Read More
          </button>
        </div>
      </div>
    </>
  );
}
