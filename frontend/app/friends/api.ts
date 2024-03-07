import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

type StatusMessage = {
  message: string;
  code: string;
};

export const friendsApi = createApi({
  reducerPath: 'friendsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    prepareHeaders: (header: Headers) => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA5ODUwOTA4LCJpYXQiOjE3MDk4NDc5MDgsImp0aSI6ImI0ZmU2NTdhM2Y4NjQyYWM5ZmJjMjc3ODBjMjc3ODFiIiwidXNlcl9pZCI6MX0.KzoSnLxdrPYFUTwe2kymTDj3FtnjTakjXkk_AwUqKco';
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
