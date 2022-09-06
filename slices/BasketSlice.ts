import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
export interface BasketProduct {
  _id: string;
  basketIdentifier: string;
  name: string;
  price: number;
  quantity: number;
  currentVariant: {
    image: { asset: { ref: string } };
    variantName: string;
    color: string;
  };
}
type _id = string;
const initialState: BasketProduct[] = [];

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct: (
      state: BasketProduct[],
      action: PayloadAction<BasketProduct>,
    ) => {
      const hasProduct = state.find(
        product => product.basketIdentifier == action.payload.basketIdentifier,
      );
      if (hasProduct) {
        const updatedState = state.map(product => {
          if (product.basketIdentifier === action.payload.basketIdentifier) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
        return updatedState;
      } else {
        return [...state, action.payload];
      }
    },
    removeProduct: (state: BasketProduct[], action: PayloadAction<string>) => {
      console.log(action.payload);
      const product = state.find(
        product => product.basketIdentifier === action.payload,
      );
      if (product && product.quantity === 1) {
        return [
          ...state.filter(
            product => product.basketIdentifier !== action.payload,
          ),
        ];
      } else if (product) {
        return [
          ...state.filter(
            product => product.basketIdentifier !== action.payload,
          ),
          { ...product, quantity: product.quantity - 1 },
        ];
      }
    },
    removeProductFromBasket: (
      state: BasketProduct[],
      action: PayloadAction<string>,
    ) => {
      const product = state.find(
        product => product.basketIdentifier === action.payload,
      );

      return [
        ...state.filter(product => product.basketIdentifier !== action.payload),
      ];
    },
    resetBasket: (state: BasketProduct[], action: PayloadAction) => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      return initialState;
    });
  },
});

export const { addProduct, removeProduct, resetBasket,removeProductFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
