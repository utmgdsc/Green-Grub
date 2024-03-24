import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

type StatusMessage = {
  message: string;
  code: string;
};

type QuizSubmission = {
  quizId: number;
  score: number;
};

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Topics', 'Quizzes', 'Questions'],
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
    }),
    getQuestion: build.query<{
        topic_id: number;
        question: string;
        option1: string;
        option2: string;
        option3: string;
        answer: number;
        explanation: string;
        article_link: string | null;
      }, { quizId: number; questionId: number }>({
        query: ({ quizId, questionId }) => ({
          url: `/quiz/${quizId}/question/${questionId}`,
          method: 'GET',
        }),
        providesTags: ['Questions'],
      }),
    postQuizResults: build.mutation<StatusMessage, QuizSubmission>({
        query: (submission) => ({
          url: `/quiz/${submission.quizId}/`, 
          method: 'POST',
          body: submission, 
        }),
        headers: {
          'Content-Type': 'application/json', 
        },
        invalidatesTags: ['Quizzes'], 
      }),
  }),
});

export const {useGetTopicsQuery, useGetQuizzesQuery, useGetQuestionQuery, usePostQuizResultsMutation} = quizApi;
