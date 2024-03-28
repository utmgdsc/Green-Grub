import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

export type User = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  extra_info: {
    city: string;
    country: string;
    avatar_url: string;
  };
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: build => ({
    getUser: build.query<User, void>({
      query: () => ({
        url: '/get_user_info/',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {useGetUserQuery} = userApi;
