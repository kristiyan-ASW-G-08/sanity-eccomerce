import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Datalist from '../Datalist';
import Product from '@eco/common/source/types/Product';
import UserEvent from '@testing-library/user-event';
describe('Datalist', () => {
  it('it renders', () => {
    const products: Product[] = [
      {
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
      },
    ];
    const resetSearch = jest.fn();
    const { container, getByTestId } = render(
      <Datalist products={products} resetSearch={resetSearch} />,
    );
    expect(container).toBeTruthy();
 
    const listItem1 = getByTestId(products[0]._id);
    UserEvent.click(listItem1);
    waitFor(() => {
      expect(resetSearch).toHaveBeenCalledTimes(1);
      expect(resetSearch).toHaveBeenCalledWith();
    });
  });
});
