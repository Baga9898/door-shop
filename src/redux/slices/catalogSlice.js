import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios                             from 'axios';

import { notify } from './../../components/shared/notify/notify';
import * as MODES from '../../components/doorsHeader/sortSelect/selectModes';

const initialState = {
  sortMode: MODES.newest,
  doors: [],
  // cartDoors: [],
};

export const getSortedDoors = createAsyncThunk(
  'catalog/getSortedDoors',
  async (sortMode, { rejectWithValue, dispatch }) => {
    const res = await axios.post(`http://localhost:5000/api/doors/sort`, { sortMode });
    dispatch(setDoors(res.data));
  },
);

export const deleteDoorById = createAsyncThunk(
  'catalog/deleteDoorById',
  async (doorId, { rejectWithValue, dispatch }) => {
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
      return rejectWithValue(error.message);
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
    // setCartDoors: (state, action) => {
    //   state.cartDoors = action.payload;
    // },
    deleteDoor: (state, action) => {
      state.doors = state.doors.filter(door => door._id !== action.payload);
    },
  },
  extraReducers: {
    [getSortedDoors.pending]: () => console.log('Здесь должен быть лоадер'), // Добавить Сценарии при ошибке.
  },
});

export const { setSortMode, setDoors, deleteDoor } = catalogSlice.actions;
export default catalogSlice.reducer;
