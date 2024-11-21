import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  image: string;
}

export const ComponentHero = (props: Props) => {
  return (
    <div className="bg-slate-700 text-white font-semibold text-4xl">
      <div className="relative mb-10 w-full">
        <Image
          className="w-full h-56 object-cover"
          src={props.image}
          alt={props.title}
          width={180}
          height={38}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-80 "></div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-3/4 text-white flex flex-col md:flex-row md:justify-between items-center justify-center gap-4 p-4 ">
          <h1 className="text-center text-5xl font-bold">{props.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ComponentHero;
