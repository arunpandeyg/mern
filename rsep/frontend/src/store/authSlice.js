import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "@/lib/axios"

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

export const signinUser = createAsyncThunk(
  "auth/signin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signin", formData)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

export const signoutUser = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signout")
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me")
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

export const updateMyImage = createAsyncThunk(
  "auth/updateMyImage",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.put("/users/me/image", formData)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: { loading: false, error: null },
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
      .addCase(signinUser.pending, (state) => {
        state.loading = true
      })
      .addCase(signinUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(signoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMe.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateMyImage.pending, (state) => {
        state.loading = true
      })
      .addCase(updateMyImage.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateMyImage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const authActions = {
  signupUser,
  signinUser,
  signoutUser,
  fetchMe,
  updateMyImage
}

export default authSlice.reducer