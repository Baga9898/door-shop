import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios                             from 'axios';

import * as MODES from '../../components/doorsHeader/sortSelect/selectModes';

const initialState = {
  sortMode: MODES.newest,
  doors: [],
};

export const getSortedDoors = createAsyncThunk(
  'catalog/getSortedDoors',
  async (sortMode, { rejectWithValue, dispatch }) => {
    const res = await axios.post(`http://localhost:5000/api/doors/sort`, { sortMode });
    dispatch(setDoors(res.data));
  },
);

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSortMode: (state, action) => {
      state.sortMode = action.payload;
    },
    setDoors: (state, action) => {
      state.doors = action.payload;
    },
  },
  extraReducers: {
    [getSortedDoors.pending]: () => console.log('Здесь должен быть лоадер')
  },
});

export const { setSortMode, setDoors } = catalogSlice.actions;
export default catalogSlice.reducer;
