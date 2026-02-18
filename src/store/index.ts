import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice"
import countSlice from "./countProduct"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: countSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
