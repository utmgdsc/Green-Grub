import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

export const userDashboardApi = createApi({
  reducerPath: 'userDashboardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User Info'],
  endpoints: (build: { query: (arg0: { query: (() => { url: string; method: string; }) | (() => { url: string; method: string; }) | (() => { url: string; method: string; }); transformResponse?: (response: { usernames: string[]; }) => string[]; providesTags: string[]; }) => any; mutation: (arg0: { query: ((username: any) => { url: string; method: string; }) | ((username: any) => { url: string; method: string; }) | ((username: any) => { url: string; method: string; }) | ((username: any) => { url: string; method: string; }); invalidatesTags: string[]; }) => any; }) => ({
    getDashboardInfo: build.query<string[], void>({
      query: () => ({
        url: '/get_user_info/',
        method: 'GET',
      }),
      providesTags: ['User Info'],
    }),   
  }),
});

export const {useGetDashboardInfoQuery} = userDashboardApi;
