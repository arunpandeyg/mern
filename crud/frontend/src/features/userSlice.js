import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'
import { api } from '../lib/axios'


export const fetchUserById = createAsyncThunk(
  'users/getUserById',
  async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  }
)

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await api.get('/users')
    return response.data
  }
)

export const createUser = createAsyncThunk(
  "user/create",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/users", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Create failed"
      );
    }
  }
);
  
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

// UPDATE USER
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/users/${id}`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

// export const updateUser = createAsyncThunk(
//   "user/updateUser",
//   async ({ id, formData }, { rejectWithValue }) => {
//     try {
//       const res = await api.put(
//         `/users/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
      
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Update failed"
//       );
//     }
//   }
// );

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/users/${id}`)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)

export const updateMyImage = createAsyncThunk(
  "user/updateMyImage",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.put(
        "/users/me/image",
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
)

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (searchData, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users?search=${searchData}`)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response.data.message)
    }
  }
)


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
      .addCase(createUser.pending, (s) => {
         s.loading = true;
       })
       .addCase(createUser.fulfilled, (s, a) => {
         s.loading = false;
         s.success = true;
         s.users.unshift(a.payload); // optional
       })
       .addCase(createUser.rejected, (s, a) => {
         s.loading = false;
         s.error = a.payload;
       })
      .addCase(fetchMe.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities.push(action.payload)
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
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
      .addCase(updateUser.pending, (s) => {
      s.loading = true;
      })
      .addCase(updateUser.fulfilled, (s) => {
        s.loading = false;
        s.success = true;
      })
      .addCase(updateUser.rejected, (s, a) => {
        s.loading = false;   
        s.error = a.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMyImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMyImage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateMyImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchUser.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.entities = action.payload
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.error.message
      })
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