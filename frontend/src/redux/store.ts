import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import jobReducer from "./modules/job";
import skillReducer from "./modules/skill";

export const store = configureStore({
  reducer: {
    job: jobReducer,
    skill: skillReducer,
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
