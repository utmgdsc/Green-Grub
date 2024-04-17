import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {setAccessToken} from './authSlice';
import {Mutex} from 'async-mutex';
import {RootState} from './store';

let SERVER_URL = '';

if (__DEV__) {
  SERVER_URL = 'http://127.0.0.1:8000/api/';
} else {
  SERVER_URL = 'http://greengrub.utm.utoronto.ca/api/';
}

console.log(`Using remote ${SERVER_URL}`);

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
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
        const refreshResult = await fetch(`${SERVER_URL}refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        });
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

  return result;
};

export {SERVER_URL};
