import { FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  addProduct,
  BasketProduct,
  removeProduct,
  removeProductFromBasket,
} from '@/slices/BasketSlice';
import ImageUrlBuilder from '@sanity/image-url';
import client from 'client';
const ProductBasketCard: FC<BasketProduct> = ({
  name,
  _id,
  price,
  currentVariant,
  quantity,
}) => {
  const dispatch = useDispatch();

  return (
    <article className="flex  w-full">
      <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg  w-full">
        <div className="bg-neutral-300">
          <img
            src={ImageUrlBuilder(client)
              .image(currentVariant?.image)
              .width(250)
              .url()}
            alt="Sunset in the mountains"
          />
        </div>

        <div className="p-6  grid space-y-3">
          <h5 className="text-2xl font-medium mb-2">{name}</h5>

          <div className="space-x-4 flex">
            <button
              onClick={() => {
                dispatch(removeProduct(`${_id}-${currentVariant.variantName}`));
              }}
              className="bg-red-400 text-neutral-50 text-3xl rounded-full w-10 h-10 grid place-center"
            >
              -
            </button>

            <button
              onClick={() => {
                dispatch(
                  addProduct({
                    name,
                    _id,
                    price,
                    currentVariant,
                    quantity,
                    basketIdentifier: `${_id}-${currentVariant.variantName}`,
                  }),
                );
              }}
              className="bg-blue-400 text-neutral-50 text-3xl rounded-full w-10 h-10 grid place-center"
            >
              +
            </button>
            <p className="w-28 h-10">Quantity {quantity}</p>
            <p className="text-gray-600 text-1xl">${price}</p>
          </div>
          <button
            className="bg-red-400 hover:bg-red-700 text-neutral-50"
            onClick={() => {
              dispatch(
                removeProductFromBasket(`${_id}-${currentVariant.variantName}`),
              );
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductBasketCard;
