import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {setAccessToken} from './authSlice';
import {Mutex} from 'async-mutex';
import {RootState} from './store';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api/',
  prepareHeaders: (header: Headers, {getState}) => {
    const token = (getState() as RootState).auth.accessToken;
    header.set('Authorization', `Bearer ${token}`);
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;
        console.log(refreshToken);
        const refreshResult = await fetch(
          'http://localhost:8000/api/refresh/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          },
        );
        const {access} = await refreshResult.json();
        if (access) {
          api.dispatch(setAccessToken(access));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  console.log(result);
  return result;
};
