import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  username: string;
}

const initialState = {
  username: '',
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, {payload}: PayloadAction<string>) {
      state.username = payload;
    },
  },
});

export const {setUsername} = userSlice.actions;
export default userSlice.reducer;
