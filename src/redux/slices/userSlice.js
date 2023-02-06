import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {},
    isAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload,
            state.isAuth = true;
        },
        logOut: (state, action) => {
            localStorage.removeItem('token');
            state.currentUser = {},
            state.isAuth = false;
        },
    },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
