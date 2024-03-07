import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import FoodInfo from '../types/FoodInfo';

export const scanApi = createApi({
  reducerPath: 'scanApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
  }),
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
