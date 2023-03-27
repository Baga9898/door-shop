import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authMode: 'auth',
    authForm: {
        username: '',
        password: '',
    },
    errors: {
        usernameError: '',
        passwordError: '',
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
        setErrors: (state, action) => {
            state.errors = action.payload;
        },
    },
});

export const { setAuthForm, setAuthMode, setAuthModalIsOpen, setErrors } = authSlice.actions;
export default authSlice.reducer;
