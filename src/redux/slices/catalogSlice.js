import { createSlice } from '@reduxjs/toolkit';

import * as MODES from '../../components/doorsHeader/sortSelect/selectModes';

const initialState = {
  sortMode: MODES.newest,
  doors: [],
  status: null,
  error: null,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSortMode: (state, action) => {
      state.sortMode = action.payload;
    },
  },
});

export const { setSortMode, setDoors, getSorted } = catalogSlice.actions;

export default catalogSlice.reducer;
