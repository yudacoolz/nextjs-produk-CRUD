import React from "react";
import ComponentABout from "./ComponentABout";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  return (
    <>
      <ComponentABout />
      <div className="px-16 ">
        <div className="flex flex-col gap-10 md:flex-row md:gap-4 md:mb-32 mb-16 mt-32">
          <div className="md:w-1/2 w-full">
            <Image
              className="w-full rounded-lg"
              src="https://nextjs.org/icons/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
          </div>
          <div className="md:w-1/2 flex flex-col items-center md:items-start gap-2 px-4">
            <p className="text-center md:text-justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
              officia minima, ad libero at harum dolor quibusdam quod magni
              aliquid quas similique, delectus eveniet aliquam dolorum autem,
              repellendus et eum?
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
              officia minima, ad libero at harum dolor quibusdam quod magni
              aliquid quas similique, delectus eveniet aliquam dolorum autem,
              repellendus et eum?
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center h-full md:mb-32 mb-16">
          <div className="grid md:grid-cols-2 md:grid-rows-2w-1/2 h-[50vh]">
            <div className="flex gap-4 border-2 items-center justify-center p-4 rounded-tl-lg hover:bg-slate-800 hover:text-white hover:scale-110 transition-all">
              <FontAwesomeIcon icon={faHome} className="" size="2xl" />
              <p className="text-lg font-semibold">Jl. Barat Timur Tengah</p>
            </div>
            <div className="flex gap-4 border-2 items-center justify-center p-4 rounded-tr-lg hover:bg-slate-800 hover:text-white hover:scale-110 transition-all">
              <FontAwesomeIcon icon={faPhone} className="" size="2xl" />
              <p className="text-lg font-semibold">0873462378429</p>
            </div>
            <div className="flex gap-4 border-2 items-center justify-center p-4 rounded-bl-lg hover:bg-slate-800 hover:text-white hover:scale-110 transition-all">
              <FontAwesomeIcon icon={faEnvelope} className="" size="2xl" />
              <p className="text-lg font-semibold">admin@gmail.com</p>
            </div>
            <div className="flex gap-4 border-2 items-center justify-center p-4 rounded-br-lg hover:bg-slate-800 hover:text-white hover:scale-110 transition-all">
              <FontAwesomeIcon icon={faInstagram} className="" size="2xl" />
              <p className="text-lg font-semibold">@Instagram</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
