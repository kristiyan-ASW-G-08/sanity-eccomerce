import Product from '@/types/Product';
import { FC, useEffect } from 'react';
import {
  addProduct,
  BasketProduct,
  removeProduct,
} from '../../slices/BasketSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductBasketCard from '@/components/ProductBasketCard';
import Link from 'next/link';
import { AuthState } from 'slices/AuthSlice';
const Basket: FC = () => {
  const basket = useSelector(
    (state: { basket: BasketProduct[] }) => state.basket,
  );
  const auth = useSelector((state: { auth: AuthState }) => state.auth);

  return (
    <section className="">
      <div className="pt-24 flex flex-col ">
        <div className=" rounded-lg bg-white shadow-lg text-center p-10 space-y-4">
          <h1 className="text-2xl font-bold">
            Subtotal ({basket.length}) Items
          </h1>
          <p>
            Final Price $
            {basket.reduce(
              (finalPrice, product) =>
                finalPrice + product.price * product.quantity,
              0,
            )}
          </p>
          {basket.length > 0 ? (
            <Link href={'/checkout'}>
              <a className="block bg-red-400 p-2 px-10 text-neutral-50">
                Proceed to Checkout
              </a>
            </Link>
          ) : (
            <button className="bg-red-400 p-2 px-10 text-neutral-50">
              Your Cart is Empty
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-red-200 items-start p-10 space-y-5 text-center">
        <h1 className="text-5xl font-bold mb-10">Shopping Cart</h1>
        <div className=" grid w-full md:grid-cols-2  gap-5">
          {basket.map(product => (
            <ProductBasketCard
              key={`${product._id}${product.currentVariant.variantName}`}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Basket;
