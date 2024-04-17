import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import FoodInfo from '../types/FoodInfo';
import {SERVER_URL} from '../api';

export const scanApi = createApi({
  reducerPath: 'scanApi',
  baseQuery: fetchBaseQuery({baseUrl: SERVER_URL}),
  endpoints: build => ({
    getProductInfo: build.query<FoodInfo, string>({
      query: barcode => ({
        url: `/scan/${barcode}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetProductInfoQuery} = scanApi;
