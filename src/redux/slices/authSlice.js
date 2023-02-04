import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authMode: 'auth',
    authForm: {
        username: '',
        password: '',
    },
    authModalIsOpen: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthMode: (state, action) => {
            state.authMode = action.payload;
        },
        setAuthForm: (state, action) => {
            state.authForm = action.payload;
        },
        setAuthModalIsOpen: (state, action) => {
            state.authModalIsOpen = action.payload;
        },
    },
});

export const { setAuthForm, setAuthMode, setAuthModalIsOpen } = authSlice.actions;
export default authSlice.reducer;
