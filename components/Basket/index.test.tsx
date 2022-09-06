import React from 'react';
import { render } from '@testing-library/react';
import Basket from '../Basket';
describe('Basket', () => {
  it('it renders', () => {
    const products = [
      {
        _id: '1',
        name: 'string',
        price: 10,
        quantity: 10,
        image: 'string',
        stock: 10,
      },
      {
        _id: '2',
        name: 'string',
        price: 10,
        quantity: 10,
        image: 'string',
        stock: 10,
      },
      {
        _id: '3',
        name: 'string',
        price: 10,
        quantity: 10,
        image: 'string',
        stock: 10,
      },
    ];
    const { container, getByText } = render(<Basket products={products} />);
    expect(container).toBeTruthy();
    const productsNumber = getByText(products.length);
    expect(productsNumber).toBeTruthy();
  });
});
