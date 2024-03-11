import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

type StatusMessage = {
  message: string;
  code: string;
};

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Topics', 'Quizzes'],
  endpoints: (build: { query: (arg0: { query: (() => { url: string; method: string; }) | (() => { url: string; method: string; }) | (() => { url: string; method: string; }); transformResponse?: (response: { usernames: string[]; }) => string[]; providesTags: string[]; }) => any; mutation: (arg0: { query: ((username: any) => { url: string; method: string; }) | ((username: any) => { url: string; method: string; }) | ((username: any) => { url: string; method: string; }) | ((username: any) => { url: string; method: string; }); invalidatesTags: string[]; }) => any; }) => ({
    getTopics: build.query<string[], void>({
      query: () => ({
        url: '/explore/',
        method: 'GET',
      }),
      providesTags: ['Topics'],
    }),
    getQuizzes: build.query<string[], void>({
        query: (topicId: number) => ({
          url: `/topic/${topicId}/`,
          method: 'GET',
        }),
        providesTags: ['Quizzes'],
      })
  }),
});

export const {useGetTopicsQuery, useGetQuizzesQuery} = quizApi;
