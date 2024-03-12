import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import {reactotron} from './reactotron';
import {scanApi} from './scan/api';
import {friendsApi} from './friends/api';
import {savedItemsApi} from './savedItems/api';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  [scanApi.reducerPath]: scanApi.reducer,
  [friendsApi.reducerPath]: friendsApi.reducer,
  [savedItemsApi.reducerPath]: savedItemsApi.reducer,
});

export const store = configureStore({
  enhancers: getDefaultEnhancer =>
    getDefaultEnhancer().concat(reactotron.createEnhancer()),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      scanApi.middleware,
      friendsApi.middleware,
      savedItemsApi.middleware,
    ),
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
