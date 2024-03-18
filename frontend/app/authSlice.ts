import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';
import {friendsApi} from './friends/api';
import {scanApi} from './scan/api';

/**
 * Auth status can be one of the following:
 * - 'loading': The initial status, before we've loaded the token
 * - 'authenticated': The user is authenticated and we have a valid token
 * - 'unauthenticated': There is no token to load and the user is not authenticated
 * - 'stale': The access token has expired and we are refreshing it
 */
export type AuthStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'stale';

interface AuthState {
  refreshToken: string;
  accessToken: string;
  status: AuthStatus;
}

const initialState: AuthState = {
  refreshToken: '',
  accessToken: '',
  status: 'loading',
};

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
  Keychain.resetInternetCredentials('greengrub');
  dispatch(friendsApi.util.resetApiState());
  dispatch(scanApi.util.resetApiState());
});

export const loadAuthToken = createAsyncThunk('auth/loadToken', async () => {
  let status: AuthStatus = 'loading';
  let refreshToken: string = '';
  try {
    const credentials = await Keychain.getInternetCredentials('greengrub');
    if (credentials) {
      refreshToken = credentials.password;
      status = 'stale';
    } else {
      status = 'unauthenticated';
    }
  } catch (error) {
    console.error('Failed to load token:', error);
    status = 'unauthenticated';
  }
  return {refreshToken, status};
});

export const saveAuthToken = createAsyncThunk(
  'auth/saveToken',
  async ({
    refreshToken,
    accessToken,
  }: {
    refreshToken: string;
    accessToken: string;
  }) => {
    try {
      await Keychain.setInternetCredentials('greengrub', 'token', refreshToken);
      return {refreshToken, accessToken};
    } catch (error) {
      console.error('Failed to save token:', error);
      throw new Error('Saving token failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        loadAuthToken.fulfilled,
        (
          state,
          action: PayloadAction<{refreshToken: string; status: AuthStatus}>,
        ) => {
          state.status = action.payload.status;
          state.refreshToken = action.payload.refreshToken;
        },
      )
      .addCase(
        saveAuthToken.fulfilled,
        (
          state,
          action: PayloadAction<{
            refreshToken: string;
            accessToken: string;
          }>,
        ) => {
          state.refreshToken = action.payload.refreshToken;
          state.accessToken = action.payload.accessToken;
          state.status = 'authenticated';
        },
      )
      .addCase(logout.fulfilled, state => {
        state.accessToken = '';
        state.accessToken = '';
        state.status = 'unauthenticated';
      });
  },
});

export const {setAccessToken} = authSlice.actions;
export default authSlice.reducer;
