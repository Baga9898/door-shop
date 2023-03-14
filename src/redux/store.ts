import { configureStore } from '@reduxjs/toolkit';

import appReducer     from './slices/appSlice';
import authReducer    from './slices/authSlice';
import cartReducer    from './slices/cartSlice';
import catalogReducer from './slices/catalogSlice';
import userReducer    from './slices/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    cart: cartReducer,
    catalog: catalogReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
