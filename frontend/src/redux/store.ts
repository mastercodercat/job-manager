import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import jobReducer from "./modules/job";

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
