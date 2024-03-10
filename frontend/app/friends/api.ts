import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

type StatusMessage = {
  message: string;
  code: string;
};

export const friendsApi = createApi({
  reducerPath: 'friendsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Friends', 'PendingFriends'],
  endpoints: build => ({
    getFriends: build.query<string[], void>({
      query: () => ({
        url: '/view_friends_list/',
        method: 'GET',
      }),
      transformResponse: (response: {usernames: string[]}) =>
        response.usernames,
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
