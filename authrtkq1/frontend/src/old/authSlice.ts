import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../rtkStore/store';

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    gender: string,
    image: string,
    phone: string,
    role: string,
    token: string,
    createdAt: Date,
    updatedAt: Date

}

export interface AuthState {
  name: string | null;
  token: string | null;
}

const initialState = {
  name: null as string | null,
  token: null as string | null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  setUser(state, action: PayloadAction<{ user: User }>) {
  if (action.payload.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(action.payload.user),
    );
    state.name = action.payload.user.name;
    state.token = action.payload.user.token;
  } else {
    console.error("Invalid action payload:", action.payload);
  }
},
    signout: (state) => {
      localStorage.removeItem("user");
      state.name = null;
      state.token = null;
    },
  },
});
export const selectAuth = (state: RootState) => state.auth;
export const { setUser, signout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction as PayloadActionType } from "@reduxjs/toolkit";
// import type { RootState } from "../../rtkStore/store";

// export interface AuthState {
//   name: string | null;
//   token: string | null;
// }

// const initialState: AuthState = {
//   name: null,
//   token: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (
//       state,
//       action: PayloadActionType<{ name: string; token: string }>
//     ) => {
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           name: action.payload.name,
//           token: action.payload.token,
//         }),
//       );
//       state.name = action.payload.name;
//       state.token = action.payload.token;
//     },
//   },
// });

// export const selectAuth = (state: RootState) => state.auth;
// export const { setUser } = authSlice.actions;
// export default authSlice.reducer;
