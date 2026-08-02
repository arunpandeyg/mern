import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",   
    initialState,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    user: action.payload.user,
                    token: action.payload.token,
                })
            );
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        signout: (state) => {
            localStorage.removeItem("user");
            state.user = null;
            state.token = null;
        },
        signin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        signup: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
    },
});

export const selectAuth = (state) => state.auth;
export const {setUser, signout, signin, signup} = authSlice.actions;
export default authSlice.reducer;










