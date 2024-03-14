import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

export type LeaderboardEntry = {
  username: string;
  score: number;
  level: number;
};

export const exploreApi = createApi({
  reducerPath: 'exploreApi',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    getLeaderboard: build.query<LeaderboardEntry[], void>({
      query: () => ({
        url: '/view_leaderboard/',
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetLeaderboardQuery} = exploreApi;
