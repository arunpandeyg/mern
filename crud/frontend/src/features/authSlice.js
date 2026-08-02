import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../lib/axios"

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", formData)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

// 🔹 getMe
export const fetchMe = createAsyncThunk(
  "users/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me")
      return res.data.user
    } catch {
      return rejectWithValue(null)
    }
  }
)


// 🔹 signin
export const signinUser = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signin", data)
      return res.data.user
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

// 🔹 signout
export const signout = createAsyncThunk("auth/signout", async () => {
  await api.post("/auth/signout")
})


const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: true, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false
        state.user = null
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reducer : authReducer } = authSlice


export default authSlice.reducer