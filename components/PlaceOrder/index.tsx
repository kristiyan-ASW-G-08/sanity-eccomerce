import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BasketProduct } from 'slices/BasketSlice';
import { Checkout } from 'slices/CheckoutSlice';
import { PaymentMethod } from 'slices/PaymentMethodSlice';
import sumProductPrices from '@/utilities/sumProductPrices';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { AuthState } from 'slices/AuthSlice';
import { resetBasket } from 'slices/BasketSlice';
import { useRouter } from 'next/router';
import FormButton from '../FormButton';
import PlaceOrderProduct from '../PlaceOrderProduct';
import { replace } from 'formik';
import client from 'client';

const PlaceOrder = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const { address, phoneNumber, zip, city, fullName, country } = useSelector(
    (state: { checkout: Checkout }) => state.checkout,
  );
  const basket = useSelector(
    (state: { basket: BasketProduct[] }) => state.basket,
  );
  const payment = useSelector(
    (state: { payment: PaymentMethod }) => state.payment,
  );
  const auth = useSelector((state: { auth: AuthState }) => state.auth);

  const price = sumProductPrices(basket);
  const shipping = price > 50 ? 0 : 5;
  return (
    <section className="space-y-5 flex flex-col md:flex-row">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold">Place Order</h1>
        <div className="space-y-2 py-2 border-b-2 border-neutral-400">
          <h2 className="text-xl font-bold ">Payment Method</h2>
          <p className="text-md font-bold text-neutral-500">{payment.method}</p>
        </div>
        <div className="space-y-2 py-2 border-b-2 border-neutral-400">
          <h2 className="text-xl font-bold ">Shipping Information</h2>
          <p className="text-md font-bold text-neutral-500">
            Full Name: {fullName}
          </p>
          <p className="text-md font-bold text-neutral-500">
            Phone Number: {phoneNumber}
          </p>
          <p className="text-md font-bold text-neutral-500">
            Address: {address}
          </p>
          <p className="text-md font-bold text-neutral-500">City: {city}</p>
          <p className="text-md font-bold text-neutral-500">ZIP: {zip}</p>
        </div>
        <div className="space-y-5 py-2 border-b-2 border-neutral-400">
          <h2 className="text-xl font-bold ">Products</h2>
          {basket.map(product => (
            <PlaceOrderProduct {...product} key={product._id} />
          ))}
        </div>
      </div>
      <div className="md:w-2/4 lg:w-1/4">
        <div className="border rounded p-10 mx-4  space-y-5 w-full flex flex-col">
          <h1 className="text-xl font-bold">Order Summary</h1>
          <p className="text-md font-bold text-neutral-500 border-b-2 border-neutral-400">
            Products: ${price}
          </p>
          <p className="text-md font-bold text-neutral-500 border-b-2 border-neutral-400">
            Shipping: {price > 50 ? 'Free' : `$${100}`}
          </p>
          <p className="text-md font-bold text-neutral-500 border-b-2 border-neutral-400">
            Total: ${price + shipping}
          </p>
          {isPending ? (
            <FormButton isSubmitting={true} content="Loading" />
          ) : (
            <PayPalScriptProvider
              options={{
                //@ts-ignore
                'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
              }}
            >
              <PayPalButtons
                style={{ layout: 'horizontal' }}
                onApprove={(data, actions: any) => {
                  return actions.order.capture().then(async (details: any) => {
                    const order = {
                      _type: 'order',
                      products: basket.map(({ _id, quantity, price }) => ({
                        productId: _id,
                        quantity,
                        currentPrice: price,
                      })),
                      fullName,
                      phoneNumber,
                      address: {
                        address: address,
                        city: city,
                        zip: zip,
                        country: country,
                      },
                      paymentMethod: payment.method,
                      shippingPrice: shipping,
                      productsPrice: price,
                      totalPrice: shipping + price,
                    };
                    client.create(order);
                    dispatch(resetBasket);
                    replace(`/`);
                  });
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
