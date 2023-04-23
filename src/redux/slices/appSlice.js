import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    globalLoading: false,
    uniqueUserId: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.globalLoading = action.payload;
        },
        setUniqueUserId: (state, action) => {
            state.uniqueUserId = action.payload;
        },
    },
});

export const { setIsLoading, setUniqueUserId } = appSlice.actions;
export default appSlice.reducer;
