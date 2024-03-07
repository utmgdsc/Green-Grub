import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice'; 
import {reactotron} from './reactotron';
import {scanApi} from './scan/api';

const rootReducer = combineReducers({
  user: userReducer,
  [scanApi.reducerPath]: scanApi.reducer,
});

export const store = configureStore({
  enhancers: getDefaultEnhancer =>
    getDefaultEnhancer().concat(reactotron.createEnhancer()),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(scanApi.middleware),
  reducer: {
    user: userReducer, 
    auth: authReducer, 
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
