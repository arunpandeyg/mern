import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signin, signup, signout } = authSlice.actions;
export default authSlice.reducer;