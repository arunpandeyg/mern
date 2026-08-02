import  { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const signupUser = createAsyncThunk ('signup/user', async (userInfo, thunkAPI) => {
   try {
     const response = await fetch ('http://localhost:5000/auth/signup', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(userInfo),
     });    
     const data = await response.json();
     console.log("Signup Response", data);
     if (!response.ok) {
         return thunkAPI.rejectWithValue(data.message || 'Failed to authenticate user');
     }    
     return data;
   } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('Failed to authenticate user');
   }
} )
const initialState = {
    user: null,
    status: undefined,
    error: null,
};

const signupSlice = createSlice ({
    name: 'signup',
    initialState,
    
    reducers: {
        signin: (state, action) => {
            state.user = action.payload;
        },
        signup: (state, action) => {
            state.user = action.payload;
        },
        signout: (state) => {
            state.user = null;
        },
        resetSignupState: (state) => {
            state.user = null;
            state.status = undefined;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
    

});
export default signupSlice.reducer;
export const { signin, signup, signout, resetSignupState } = signupSlice.actions;