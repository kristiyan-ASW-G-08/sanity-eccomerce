import Product from '@/types/Product';
import { useQuery } from '@tanstack/react-query';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import client from '../../client';
import ProductCard from '@/components/ProductCard';

const Container = () => {
  const [product, setProducts] = useState<Product[]>([]);
  const [currentVariant, setVariant] = useState<any>();
  const { data, error, isLoading, isSuccess } = useQuery(
    ['products'],
    async () => await client.fetch(`*[_type == "product"]`),
  );
  console.log(data);
  useEffect(() => {
    setProducts(data);
  }, []);
  const selectHandler = async (e: SyntheticEvent) => {
    const value = (e.target as HTMLSelectElement).value;
    setProducts(await client.fetch(
        `*[_type == "product"] | order(price ${value})`,
      ));
  };
  return (
    <section className="m-h-screen w-screen bg-red-100 text-center p-10">
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
