import Link from 'next/link';
import React, { FC } from 'react';

interface SlideProps {
  brand: string;
  model: string;
  text: string;
  href: string;
  imageSrc: string;
}
const Slide: FC<SlideProps> = ({ brand, model, text, href, imageSrc }) => {
  return (
    <div className=" w-full bg-red-100 lg:grid place-items-center  lg:grid-cols-2 mb-10">
      <div className="w-full h-full grid mb-7 animate-slideLeft">
        <p className="text-red-700 font-bold text-xl">
          #Clean and Modern Design
        </p>
        <h1 className="text-neutral-700 font-bold lg:text-9xl text-5xl mb-4">
          {brand}
        </h1>
        <h2 className="text-neutral-700 font-bold lg:text-5xl text-3xl mb-4">
          {model}
        </h2>
        <p className="text-neutral-700 font-bold text-xl mb-10">{text}</p>
        <button className="border-4 border-blue-900 hover:bg-blue-900 text-red-700 rounded-full  px-5 lg:px-10 py-3  content-center text-lg lg:text-2xl font-bold  justify-self-start">
          <Link href={href}>Explore More</Link>
        </button>
      </div>
      <div className="animate-slideTop">
        <img className="h-full" src={imageSrc}></img>
      </div>
    </div>
  );
};

export default Slide;
