import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';
import FoodInfo from '../types/FoodInfo';

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
    getSavedItems: build.query<FoodInfo[], void>({
      query: () => ({
        url: '/user_products/',
        method: 'GET',
      }),
      providesTags: ['SavedItems'],
      transformResponse: (response: {[key: string]: FoodInfo}) =>
        Object.values(response),
    }),
  }),
});

export const {useUpdateSavedItemsMutation, useGetSavedItemsQuery} =
  savedItemsApi;
