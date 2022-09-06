import React from 'react';
import { render, waitFor } from '@testing-library/react';
import DatalistItem from '../DatalistItem';
import Product from '@eco/common/source/types/Product';
import UserEvent from '@testing-library/user-event';
describe('DatalistItem', () => {
  it('it renders', () => {
    const product = {
      user: 'string',
      name: 'string',
      images: ['string'],
      specifications: [{ name: 'cores', description: 'description' }],
      brand: 'string',
      category: 'Audio',
      hasDeal: false,
      dealPrice: 0,
      description: 'string',
      rating: 0,
      numReviews: 0,
      price: 0,
      stock: 0,
      _id: 'string',
    };

    const resetSearch = jest.fn();
    const { container, getByTestId } = render(
      <DatalistItem {...product} resetSearch={resetSearch} />,
    );
    expect(container).toBeTruthy();
    UserEvent.click(container);
    waitFor(() => {
      expect(resetSearch).toHaveBeenCalledTimes(1);
      expect(resetSearch).toHaveBeenCalledWith();
    });
  });
});
