import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from '../api';

type StatusMessage = {
  message: string;
  code: string;
};

export type LeaderboardEntry = {
    username: string;
    score: number;
    level: number;
  };
  
  export const leaderboardApi = createApi({
    reducerPath: 'leaderboardApi',
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
  
  export const {useGetLeaderboardQuery} = leaderboardApi;