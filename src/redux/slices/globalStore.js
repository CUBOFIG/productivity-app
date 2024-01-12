import { createSlice } from '@reduxjs/toolkit';

export const globalStoreSlice = createSlice({
  name: 'global',
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const { incremented, decremented } = globalStoreSlice.actions;

export default globalStoreSlice.reducer;
