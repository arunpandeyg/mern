import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../rtkStore/store";

export interface AuthState {
  user: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{name: string, token: string}>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
          token: action.payload.token,
        })
      )
      state.user = action.payload.name;
      state.token = action.payload.token;
    },
    signout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.token = null;
    },
    signup: (state, action: PayloadAction<{name: string, token: string}>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
          token: action.payload.token,
        })
      )
      state.user = action.payload.name;
      state.token = action.payload.token;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser, signout, signup } = authSlice.actions;
export default authSlice.reducer;
