import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import ContactInformation from '.';
import transformValidationErrors from '@/utilities/transformValidationErrors';

import { Provider } from 'react-redux';
import Store from '@/store/testStore';
import { registerCheckout } from 'slices/CheckoutSlice';
jest.mock('@/utilities/postRequest');
jest.mock('@/slices/CheckoutSlice/index');

transformValidationErrors as jest.MockedFunction<
  typeof transformValidationErrors
>;
describe('ContactInformation', () => {
  jest.setTimeout(30000);
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  afterAll(() => jest.clearAllMocks());
  it('it renders', async () => {
    // expect.assertions(8);
    const inputs = [
      {
        value: 'John Doe',
        placeholder: 'Full Name',
        name: 'fullName',
      },
      {
        value: 'Some Address',
        placeholder: 'Address',
        name: 'address',
      },
      {
        value: 'somephonenumber',
        placeholder: 'Phone Number',
        name: 'phoneNumber',
      },
      {
        value: '4000000000000000000000000000000000000',
        placeholder: 'Zip',
        name: 'zip',
      },
      {
        value: 'Country',
        placeholder: 'Country',
        name: 'Country',
      },
      {
        value: 'City',
        placeholder: 'City',
        name: 'City',
      },
    ];
    const incrementCurrentStep = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <ContactInformation incrementCurrentStep={incrementCurrentStep} />,
      {
        wrapper: ({ children }) => (
          <Provider store={Store}>{children}</Provider>
        ),
      },
    );

    for await (const { placeholder, value } of inputs) {
      const input = getByPlaceholderText(placeholder);
      await UserEvent.type(input, value);
      await waitFor(() => {
        expect(input).toHaveAttribute('value', value);
      });
    }

    const submitButton = getByText('Continue');

    UserEvent.click(submitButton);

    waitFor(() => {
      expect(registerCheckout).toHaveBeenCalledTimes(1);
    });
    waitFor(() => {
      expect(registerCheckout).toHaveBeenCalled();
    });
  });
});
