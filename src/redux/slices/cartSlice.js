import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOrderSuccess: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsOrderSuccess: (state, action) => {
            state.isOrderSuccess = action.payload;
        },
    },
});

export const { setIsOrderSuccess } = cartSlice.actions;
export default cartSlice.reducer;
