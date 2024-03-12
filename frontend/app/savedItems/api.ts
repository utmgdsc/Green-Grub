import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

type ServerProduct = {
  image: string;
  name: string;
  nutriScore: number;
  sustainabilityScore: number;
};

export type Product = {
  img: string;
  name: string;
  nutriScore: number;
  sustainabilityScore: number;
};

export const savedItemsApi = createApi({
  reducerPath: 'savedItemsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['SavedItems'],
  endpoints: build => ({
    updateSavedItems: build.mutation<void, string>({
      query: (barcode: string) => ({
        url: `/scan_and_save/${barcode}/`,
        method: 'GET',
      }),
      invalidatesTags: ['SavedItems'],
    }),
    getSavedItems: build.query<Product[], void>({
      query: () => ({
        url: '/user_products/',
        method: 'GET',
      }),
      providesTags: ['SavedItems'],
      transformResponse: (response: {[key: string]: ServerProduct}) =>
        Object.values(response).map(p => ({
          img: p.image,
          ...p,
        })),
    }),
  }),
});

export const {useUpdateSavedItemsMutation, useGetSavedItemsQuery} =
  savedItemsApi;
