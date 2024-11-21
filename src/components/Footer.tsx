import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 md:px-16 mt-4 static bottom-0 w-full">
      <div className="flex flex-col md:flex-row gap-3 w-[80%]">
        <div className="md:w-1/4 md:pr-4">
          <h3 className="font-bold text-2xl mb-5">Summary</h3>
          <p className="line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sunt
            porro debitis quod quae, vero, ut quaerat ducimus aperiam asperiores
            inventore nulla facere ratione. Suscipit animi in minus ipsum nisi.
          </p>
        </div>

        <div className=" md:w-1/4 md:pr-4">
          <h3 className="font-bold text-2xl mb-5">Follow us on:</h3>
          <div className="flex gap-3 mb-3 items-center">
            <FontAwesomeIcon icon={faInstagram} />
            <p>@Instagram</p>
          </div>
          <div className="flex gap-3 mb-3 items-center">
            <FontAwesomeIcon icon={faFacebook} />
            <p>Facebook@yahoo.com</p>
          </div>
          <div className="flex gap-3 mb-3 items-center">
            <FontAwesomeIcon icon={faTwitter} />
            <p>@Twitter</p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/4 md:pr-4">
          <h3 className="font-bold text-2xl mb-5">Pages</h3>
          <div className="flex gap-3 flex-col">
            <Link href={"/"}>Home</Link>
            <Link href={"/products"}>Products</Link>
            <Link href={"/about"}>About</Link>
          </div>
        </div>

        <div className="md:w-1/4 md:pr-4">
          <h3 className="font-bold text-2xl mb-5">About us</h3>
          <div className="flex gap-2 mb-3 items-center">
            <FontAwesomeIcon icon={faHome} />
            <p>Jl. BRaya Barat Timur Tengah</p>
          </div>
          <div className="flex gap-2 mb-3 items-center">
            <FontAwesomeIcon icon={faPhone} />
            <p>0873462378429</p>
          </div>
          <div className="flex gap-2 mb-3 items-center">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>admin@gmail.com</p>
          </div>
        </div>
      </div>

      <p className="my-5 text-center md:text-right">
        &copy; 2024 My Website Footer
      </p>
    </footer>
  );
};

export default Footer;
