import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction }            from '@reduxjs/toolkit';

import * as MODES from '../../components/doorsHeader/sortSelect/selectModes';
import { API }    from './../../axios/instance';

export type СatalogState = {
  sortMode: string;
  doors: [];
}

const initialState: СatalogState = {
  sortMode: MODES.newest,
  doors: [],
}

// export const getSortedDoors = createAsyncThunk(
//   'catalog/getSortedDoors',
//   async (params, { rejectWithValue, dispatch }) => {
//     const response = await API.post('/doors?name=calf', {params});
//     dispatch(setSortedDoors(response.data));
//   }
// );

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSortMode: (state, action: PayloadAction<string>) => {
      state.sortMode = action.payload;
    },
    setSortedDoors: (state, action: PayloadAction<[]>) => {
      state.doors = action.payload;
    },
  },
})

export const { setSortMode, setSortedDoors } = counterSlice.actions;

export default counterSlice.reducer;
