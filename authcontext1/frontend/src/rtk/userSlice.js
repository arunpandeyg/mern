import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../components/lib/axios'
import { createSelector } from '@reduxjs/toolkit';


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users?page=${page}&limit=${limit}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
export const fetchUserById = createAsyncThunk(
  'users/getUserById',
  async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  }
)

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users', userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userData.id}`, userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/${userId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)



export const selectUser = createSelector(
  (state) => state.user.entities,
  (entities) => entities[0] || null
)

export const selectUserLoading = createSelector(
  (state) => state.user.loading,
  (loading) => loading
)

export const selectUserError = createSelector(
  (state) => state.user.error,
  (error) => error
)

const initialState = {
  entities: [],
  loading: 'idle',
  error: null,
  success: false,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,  
 
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchUsers.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
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
      .addCase(createUser.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })  
      .addCase(updateUser.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities.push(action.payload)
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities.push(action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
     
          
  },
})


export const { reducer: userReducer, actions: userActions, name, resetUserState } = usersSlice

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