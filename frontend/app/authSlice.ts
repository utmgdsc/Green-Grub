import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

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

export const logout = createAsyncThunk('auth/logout', async () => {
  Keychain.resetInternetCredentials('greengrub');
});

export const loadAuthToken = createAsyncThunk('auth/loadToken', async () => {
  let status: AuthStatus = 'loading';
  let token: string = '';
  try {
    const credentials = await Keychain.getInternetCredentials('greengrub');
    if (credentials) {
      token = credentials.password;
      status = 'authenticated';
    } else {
      status = 'unauthenticated';
    }
  } catch (error) {
    console.error('Failed to load token:', error);
    status = 'unauthenticated';
  }
  return {token, status};
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadAuthToken.fulfilled,
        (state, action: PayloadAction<{token: string; status: AuthStatus}>) => {
          state.status = action.payload.status;
          state.accessToken = action.payload.token;
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

// Export actions and reducer
export default authSlice.reducer;
