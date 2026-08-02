import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../lib/axios";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// 🔹 signin

export const signinUser = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/auth/signin",
        data,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Signin failed");
    }
  },
);

// 🔹 getMe
export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me", { withCredentials: true });
      return res.data.user;
    } catch (err) {
      console.log(err);
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch user data not authenticated",
      );
    }
  },
);

// 🔹 signout
export const signoutUser = createAsyncThunk("auth/signout", async () => {
  await api.post("/auth/signout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reducer: authReducer } = authSlice;

export default authSlice.reducer;
