import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';
import FoodInfo from '../types/FoodInfo';

export type CartStatus = {
  id: number;
  name?: string;
  finalized: boolean;
};

export type Cart = CartStatus & {
  items: {
    id: number;
    quantity: number;
    product_details: FoodInfo;
  }[];
};

export type CartModification = {
  cart_id: number;
  barcode: string;
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
      invalidatesTags: ['CartItem'],
    }),
    modifyCart: build.mutation<CartStatus, CartModification>({
      query: body => ({
        url: '/modify_cart/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CartItem'],
    }),
    finalizeCart: build.mutation<void, number>({
      query: id => ({
        url: `/finalize_cart/${id}/`,
        method: 'POST',
      }),
      invalidatesTags: ['CartItem'],
    }),
    getCart: build.query<Cart, number>({
      query: cartId => ({
        url: `/get_cart/${cartId}/`,
        method: 'GET',
      }),
      providesTags: ['CartItem'],
    }),
    getAllCarts: build.query<Cart[], void>({
      query: () => ({
        url: '/get_all_carts/',
        method: 'GET',
      }),
      providesTags: ['CartItem'],
    }),
    updateCartName: build.mutation<void, {cart_id: number; name: string}>({
      query: ({cart_id, name}) => ({
        url: '/update_cart_name/',
        method: 'POST',
        body: {name, cart_id},
      }),
      invalidatesTags: ['CartItem'],
    }),
  }),
});

export function useActiveCart() {
  const {data: carts, isFetching} = useGetAllCartsQuery();
  return !isFetching ? carts?.find(cart => !cart.finalized) : null;
}

export const {
  useCreateCartMutation,
  useModifyCartMutation,
  useGetCartQuery,
  useGetAllCartsQuery,
  useFinalizeCartMutation,
  useUpdateCartNameMutation,
} = cartApi;
