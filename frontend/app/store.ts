import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice'; 
import {reactotron} from './reactotron';

export const store = configureStore({
  enhancers: getDefaultEnhancer =>
    getDefaultEnhancer().concat(reactotron.createEnhancer()),
  reducer: {
    user: userReducer, 
    auth: authReducer, 
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
