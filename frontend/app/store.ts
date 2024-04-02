import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import authReducer from './authSlice';
import {reactotron} from './reactotron';
import {scanApi} from './scan/api';
import {friendsApi} from './friends/api';
import {quizApi} from './explore/api';
import {userDashboardApi} from './home/api';
import {leaderboardApi} from './leaderboard/api';
import {savedItemsApi} from './savedItems/api';
import {cartApi} from './cart/api';
import {userApi} from './login/api';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  [scanApi.reducerPath]: scanApi.reducer,
  [friendsApi.reducerPath]: friendsApi.reducer,
  [quizApi.reducerPath]: quizApi.reducer,
  [userDashboardApi.reducerPath]: userDashboardApi.reducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer,
  [savedItemsApi.reducerPath]: savedItemsApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  enhancers: getDefaultEnhancer =>
    getDefaultEnhancer().concat(reactotron.createEnhancer()),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      scanApi.middleware,
      friendsApi.middleware,
      quizApi.middleware,
      userDashboardApi.middleware,
      leaderboardApi.middleware,
      savedItemsApi.middleware,
      cartApi.middleware,
      userApi.middleware,
    ),
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
