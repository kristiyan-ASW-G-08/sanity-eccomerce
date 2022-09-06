import { FC } from 'react';
import { BasketProduct } from 'slices/BasketSlice';
import ImageUrlBuilder from '@sanity/image-url';
import client from '../../client';
const PlaceOrderProduct: FC<BasketProduct> = ({
  _id,
  name,
  price,
  quantity,
  currentVariant,
}) => {
  return (
    <article className="flex space-x-20 py-2 " key={_id}>
      <img
        src={ImageUrlBuilder(client)
          .image(currentVariant?.image)
          .width(50)
          .url()}
        alt="Sunset in the mountains"
      />
      <p>{name}</p>
      <p>
        ${price} X {quantity} = ${price * quantity}
      </p>
    </article>
  );
};
export default PlaceOrderProduct;
