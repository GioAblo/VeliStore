import { UserInterface } from "@/interfaces/interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: UserInterface | Partial<UserInterface> | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInSuccess: (
      state,
      action: PayloadAction<{ user: Partial<UserInterface>; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    updateProfile: (state, action: PayloadAction<Partial<UserInterface>>) => {
        state.user = {...state.user, ...action.payload}
    },
  },
});

export const {logInSuccess, logOut, updateProfile} = authSlice.actions
export default authSlice.reducer
