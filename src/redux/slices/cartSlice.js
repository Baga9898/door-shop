import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOrderSuccess: false,
    cartDoors: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsOrderSuccess: (state, action) => {
            state.isOrderSuccess = action.payload;
        },
        setCartDoors: (state, action) => {
            state.cartDoors = action.payload;
        },
        addCartDoor: (state, action) => {
            state.cartDoors = [...state.cartDoors, action.payload];
        },
        setEmptyCart: (state, action) => {
            state.cartDoors = [];
        },
    },
});

export const { setIsOrderSuccess, setCartDoors, addCartDoor, setEmptyCart } = cartSlice.actions;
export default cartSlice.reducer;
