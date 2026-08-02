import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../components/lib/axios'

export const fetchUserById = createAsyncThunk(
  'users/getUserById',
  async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  }
)

// UPDATE USER
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `/users/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);



// const initialState = {
//   entities: [],
//   loading: 'idle',
//   error: null,
// }

const usersSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities.push(action.payload)
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
       .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export const { resetUserState } = usersSlice.actions;
export const { reducer: userReducer } = usersSlice

export default usersSlice.reducer





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import { api } from "../components/lib/axios"

// export const fetchUserById = createAsyncThunk(
//   "user/fetchById",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const res = await api.get(`/users/${userId}`)
//       return res.data.user
//     } catch (err) {
//       return rejectWithValue(err.response.data.message)
//     }
//   }
// )

// const initialState = {
//   entities: [],
//   loading: 'idle',
//   error: null,
// }

// const userSlice = createSlice({
//   name: "user",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserById.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(fetchUserById.fulfilled, (state, action) => {
//         state.user = action.payload
//         state.loading = false
//       })
//       .addCase(fetchUserById.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })
//   },
// })

// export const {reducer : userReducer} = userSlice

// export default userSlice.reducer