import Product from '@/types/Product';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import client from '../../client';
import ProductCard from '../ProductCard';

const Container = () => {
  const [product, setProducts] = useState<Product[]>([]);
  const [currentVariant, setVariant] = useState<any>();
  const { data, error, isLoading, isSuccess } = useQuery(
    ['products'],
    async () =>
      await client.fetch(
        `*[_type == "product"] | order(_createdAt desc)[0..9]`,
      ),
  );
  console.log(data);
  return (
    <section className="m-h-screen w-screen bg-red-100 text-center p-10">
      <div className="grid grid-cols-2">
        <h2 className="text-3xl font-bold text-neutral-700 mb-10 justify-self-start">
          Latest Products
        </h2>
      </div>
      {isLoading ? (
        <p className="w-full text-center text-2xl text-neutral-50">
          Loading...
        </p>
      ) : (
        <div className=" w-full  grid md:grid-cols-3 gap-5">
          {isSuccess && data[0].variants[0].image !== undefined
            ? data.map((product: Product) => (
                <ProductCard key={product._id} {...product} />
              ))
            : ''}
        </div>
      )}
    </section>
  );
};

export default Container;
