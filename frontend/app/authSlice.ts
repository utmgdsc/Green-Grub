import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  token: string;
  status: AuthStatus;
}

const initialState: AuthState = {
  token: '',
  status: 'loading', 
};

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
  return { token, status };
});

export const saveAuthToken = createAsyncThunk(
  'auth/saveToken',
  async (token: string) => {
    try {
      await Keychain.setInternetCredentials('yourAppName', 'token', token);
      return token;
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
    logout: (state) => {
      state.status = 'unauthenticated';
      state.token = '';
      Keychain.resetInternetCredentials('greengrub');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAuthToken.fulfilled, (state, action: PayloadAction<{token: string; status: AuthStatus}>) => {
        state.status = action.payload.status;
        state.token = action.payload.token;
      })
      .addCase(saveAuthToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.status = 'authenticated';
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
