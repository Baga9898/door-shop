import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import * as MODES from '../../components/doorsHeader/sortSelect/selectModes';

export interface СatalogState {
  sortMode: string;
}

const initialState: СatalogState = {
  sortMode: MODES.newest,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSortMode: (state, action: PayloadAction<string>) => {
      state.sortMode = action.payload;
    },
  },
})

export const { setSortMode } = counterSlice.actions;

export default counterSlice.reducer;
