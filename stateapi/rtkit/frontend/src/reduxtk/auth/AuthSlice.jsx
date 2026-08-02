import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const authUser = createAsyncThunk(
  "auth/user",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to authenticate user"
        );
      }
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Failed to authenticate user");
    }
  }
);

const initialState = {
  user: null,
  token: null,
  status: undefined,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    signin: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    signout: (state) => {
      state.user = null;
      state.token = null;
    },
    resetSignupState: (state) => {
      state.user = null;
      state.status = undefined;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    });
    builder.addCase(authUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
export const { signin, signup, signout, setCredentials, resetSignupState } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectCurrentToken = (state) => state.auth.token;
export const selectStatus = (state) => state.auth.status;
export const selectCurrentStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;
export const selectCurrentError = (state) => state.auth.error;
