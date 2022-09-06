import { useQuery } from '@tanstack/react-query';
import client from 'client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ImageUrlBuilder from '@sanity/image-url';
import dynamicColors from '../../../dynamicBackgrounds/colors';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/slices/BasketSlice';
const ProductPage = () => {
  const { id } = useRouter().query;
  console.log(id);
  const { data, error, isLoading, isSuccess } = useQuery(
    ['products'],
    async () => await client.fetch(`*[_type == "product" && _id == "${id}" ]`),
  );
  console.log(data);
  const [currentVariant, setVariant] = useState<any>();
  useEffect(() => {
    if (isSuccess) {
      setVariant(data[0].variants[0]);
    }
  }, []);
  const dispatch = useDispatch();
  if (isSuccess) {
    return (
      <section className="lg:px-48 grid lg:grid-cols-2 py-20">
        <div>
          <img
            src={ImageUrlBuilder(client)
              .image(currentVariant?.image || data[0].variants[0].image)
              .width(400)
              .url()}
            alt="Sunset in the mountains"
          />
          <div className="px-6 pt-4 pb-2 grid grid-cols-3 gap-3">
            {data[0]?.variants.map((variant: any) => (
              <button
                onClick={() => setVariant(variant)}
                //@ts-ignore
                style={{ background: `${dynamicColors[variant.variantName]}` }}
                key={variant.color}
                className={`${variant.color} rounded-full h-8 w-8`}
              ></button>
            ))}
          </div>
        </div>
        <div>
          <div className="px-6 py-4 border-b-8 border-neutral-200 mb-10">
            <h4 className="font-bold text-xl mb-2 bg-neutral-300 rounded-full px-10 text-center">
              {data[0].name}
            </h4>
            <h5 className="font-bold text-lg mb-2">{data[0].brand}</h5>
            <p className="text-gray-700 text-base">{data[0].description}</p>
          </div>
          <div className="w-full">
            <p className="text-neutral-700 font-bold text-xl">
              Price
              <span className="text-yellow-400">
                {data[0].discount && data[0].discount.hasDiscount ? (
                  <span className="line-through mr-3">${data[0].price}</span>
                ) : (
                  ''
                )}
                $
                {data[0].discount && data[0].discount.hasDiscount
                  ? data[0].price -
                    (data[0].price * data[0].discount.percentage) / 100
                  : data[0].price}
              </span>
            </p>
            <button
              className="mt-2 w-full p-5 bg-red-700 text-xl text-neutral-50  hover:bg-red-300"
              onClick={() => {
                dispatch(
                  addProduct({
                    name: data[0].name,
                    quantity: 1,
                    price: data[0].discount.hasDiscount
                      ? data[0].price -
                        (data[0].price * data[0].discount.percentage) / 100
                      : data[0].price,
                    _id: data[0]._id,
                    currentVariant,
                    basketIdentifier: `${data[0]._id}-${currentVariant.variantName}`,
                  }),
                );
              }}
            >
              Order Now
            </button>
          </div>
        </div>
      </section>
    );
  } else if (isLoading) {
    <div>Loading....</div>;
  }
};

export default ProductPage;
