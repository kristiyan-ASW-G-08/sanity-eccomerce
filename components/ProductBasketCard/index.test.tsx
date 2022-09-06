import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ProductBasketCard from '.';
import UserEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Store from '@/store/index';
import { removeProduct, addProduct } from '@/slices/BasketSlice';

jest.mock('@/slices/BasketSlice');

describe('ProductBasketCard', () => {
  afterEach(() => jest.resetAllMocks());
  afterAll(() => jest.restoreAllMocks());
  it('render ', async () => {
    const product = {
      name: 'Product',
      _id: '1',
      price: 1000,
      image: 'someimage',
      quantity: 3,
      stock: 10,
    };
    const { container, getByText } = render(<ProductBasketCard {...product} />, {
      wrapper: ({ children }) => <Provider store={Store}>{children}</Provider>,
    });

    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();

    const addButton = getByText('Add');
    const removeButton = getByText('Remove');
    UserEvent.click(addButton);

    waitFor(() => {
      expect(addProduct).toHaveBeenCalledTimes(1);
    });



    UserEvent.click(removeButton);

    waitFor(() => {
      expect(removeProduct).toHaveBeenCalledTimes(1);
    });

  });
});
