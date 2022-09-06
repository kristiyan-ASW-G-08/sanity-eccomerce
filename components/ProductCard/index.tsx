import Product from '@/types/Product';
import React, { FC, useEffect, useState } from 'react';
import ImageUrlBuilder from '@sanity/image-url';
import client from '../../client';
import dynamicColors from '../../dynamicBackgrounds/colors';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/slices/BasketSlice';
const ProductCard: FC<Product> = ({
  _id,
  name,
  brand,
  price,
  description,
  featured,
  discount,
  variants,
}) => {
  console.log(variants);
  const [currentVariant, setVariant] = useState<any>();
  useEffect(() => {
    setVariant(variants[0]);
  }, []);

  const dispatch = useDispatch();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg grid place-items-center bg-neutral-100 p-5">
      <Link href={`/product/${_id}`}>
        <a href="">
          {' '}
          <img
            src={ImageUrlBuilder(client)
              .image(currentVariant?.image || variants[0].image)
              .width(200)
              .url()}
            alt="Sunset in the mountains"
          />
        </a>
      </Link>

      <div className="px-6 py-4 border-b border-b-8 border-neutral-200">
        <h4 className="font-bold text-xl mb-2 bg-neutral-300 rounded-full">
          {name}
        </h4>
        <h5 className="font-bold text-lg mb-2">{brand}</h5>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <p className="text-2xl">Choose A Variant</p>
      <div className="px-6 pt-4 pb-2 grid grid-cols-3 gap-3">
        {variants.map(variant => (
          <button
            onClick={() => setVariant(variant)}
            //@ts-ignore
            style={{ background: `${dynamicColors[variant.variantName]}` }}
            key={variant.color}
            className={`${variant.color} rounded-full h-8 w-8`}
          ></button>
        ))}
      </div>
      <div className="w-full p-">
        <p className="text-neutral-700 font-bold text-xl">
          {' '}
          Price{' '}
          <span className="text-yellow-400">
            {discount && discount.hasDiscount ? (
              <span className="line-through mr-3">${price}</span>
            ) : (
              ''
            )}
            $
            {discount && discount.hasDiscount
              ? price - (price * discount.percentage) / 100
              : price}
          </span>
        </p>
        <button
          className="mt-2 w-full p-5 bg-red-700 text-xl text-neutral-50  hover:bg-red-300"
          onClick={() => {
            dispatch(
              addProduct({
                name,
                quantity: 1,
                price: discount?.hasDiscount
                  ? price - (price * discount.percentage) / 100
                  : price,
                _id,
                currentVariant,
                basketIdentifier: `${_id}-${currentVariant.variantName}`,
              }),
            );
          }}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
