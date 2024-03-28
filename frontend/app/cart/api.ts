import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';
import FoodInfo from '../types/FoodInfo';

export type CartStatus = {
  id: number;
  finalized: boolean;
};

export type Cart = CartStatus & {
  items: FoodInfo[];
};

export type CartModification = {
  cart_id: number;
  barcode: number;
  change_amount: number;
};

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['CartItem'],
  endpoints: build => ({
    createCart: build.mutation<CartStatus, void>({
      query: () => ({
        url: '/create_cart/',
        method: 'POST',
      }),
    }),
    modifyCart: build.mutation<CartStatus, void>({
      query: () => ({
        url: '/modify_cart/',
        method: 'POST',
      }),
      invalidatesTags: ['CartItem'],
    }),
    getCart: build.query<Cart, number>({
      query: cartId => ({
        url: `/get_cart/${cartId}`,
        method: 'GET',
      }),
      providesTags: ['CartItem'],
    }),
    getAllCarts: build.query<Cart[], void>({
      query: () => ({
        url: '/get_all_carts/',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateCartMutation,
  useModifyCartMutation,
  useGetCartQuery,
  useGetAllCartsQuery,
} = cartApi;
