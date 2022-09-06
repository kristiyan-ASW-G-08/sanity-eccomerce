import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import { authReducer } from '../reducers/AuthReducers';
import authReducer from '../slices/AuthSlice';
import checkoutReducer from '../slices/CheckoutSlice';
import basketReducer from '../slices/BasketSlice';
import paymentReducer from '../slices/PaymentMethodSlice';
import notificationReducer from '../slices/NotificationSlice';

//@ts-ignore
const reducer = combineReducers({
  //@ts-ignore
  auth: authReducer,
  //@ts-ignore
  notification: notificationReducer,
  //@ts-ignore
  basket: basketReducer,
  //@ts-ignore
  checkout: checkoutReducer,
  //@ts-ignore
  payment: paymentReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};
const preloadedState = {};

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  preloadedState,
});

export const persistor = persistStore(Store);
export default Store;
