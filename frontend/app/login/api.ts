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

export type ReducedUser = {
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
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
    getOtherUser: build.query<User, string>({
      query: username => ({
        url: `/get_friends_info/${username}/`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getReducedUser: build.query<ReducedUser, string>({
      query: username => ({
        url: `/get_basic_user_info/${username}/`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
});

export const {useGetUserQuery, useGetOtherUserQuery, useGetReducedUserQuery} =
  userApi;
