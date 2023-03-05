import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios                             from 'axios';

import { notify } from './../../components/shared/notify/notify';
import * as MODES from '../../components/doorsHeader/sortSelect/selectModes';

const initialState = {
  sortMode: MODES.newest,
  doors: [],
};

export const getSortedDoors = createAsyncThunk(
  'catalog/getSortedDoors',
  async (sortMode, { dispatch }) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/doors/sort`, { sortMode });
      dispatch(setDoors(res.data));
    } catch (error) {
      console.error(error.message);
    }
  },
);

export const deleteDoorById = createAsyncThunk(
  'catalog/deleteDoorById',
  async (doorId, { dispatch }) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/doors/${doorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      dispatch(deleteDoor(doorId));
      notify('success', 'Удаление прошло успешно');
    } catch (error) {
      notify('error', 'Что - то пошло не так');
    }
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
    deleteDoor: (state, action) => {
      state.doors = state.doors.filter(door => door._id !== action.payload);
    },
  },
});

export const { setSortMode, setDoors, deleteDoor } = catalogSlice.actions;
export default catalogSlice.reducer;
