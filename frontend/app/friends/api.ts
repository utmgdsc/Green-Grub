import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '../store';

type StatusMessage = {
  message: string;
  code: string;
};

export const friendsApi = createApi({
  reducerPath: 'friendsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (header: Headers, {getState}) => {
      const token = (getState() as RootState).auth.accessToken;
      header.set('Authorization', `Bearer ${token}`);
    },
  }),
  tagTypes: ['Friends', 'PendingFriends'],
  endpoints: build => ({
    getFriends: build.query<{username: string}[], void>({
      query: () => ({
        url: '/view_friends_list/',
        method: 'GET',
      }),
      providesTags: ['Friends'],
    }),
    addFriend: build.mutation<StatusMessage, string>({
      query: username => ({
        url: `/add_friend/${username}/`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingFriends'],
    }),
    removeFriend: build.mutation<StatusMessage, string>({
      query: username => ({
        url: `/unfriend/${username}/`,
        method: 'POST',
      }),
      invalidatesTags: ['Friends'],
    }),
    acceptFriend: build.mutation<StatusMessage, string>({
      query: username => ({
        url: `/accept_friend/${username}/`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingFriends'],
    }),
    declineFriend: build.mutation<StatusMessage, string>({
      query: username => ({
        url: `/decline_friend/${username}/`,
        method: 'POST',
      }),
      invalidatesTags: ['PendingFriends'],
    }),
    getFriendRequestsSent: build.query<{username: string}[], void>({
      query: () => ({
        url: '/friend_requests_sent/',
        method: 'GET',
      }),
      providesTags: ['PendingFriends'],
    }),
    getFriendsRequestsReceived: build.query<{username: string}[], void>({
      query: () => ({
        url: '/friend_requests_received/',
        method: 'GET',
      }),
      providesTags: ['PendingFriends'],
    }),
  }),
});

export const {useGetFriendsQuery, useAddFriendMutation} = friendsApi;
