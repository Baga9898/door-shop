import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    globalLoading: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.globalLoading = action.payload;
        },
    },
});

export const { setIsLoading } = appSlice.actions;
export default appSlice.reducer;
