import { configureStore } from '@reduxjs/toolkit';
import globalStoreSlice from '../redux/slices/globalStore';

const Store = configureStore({
  reducer: {
    global: globalStoreSlice,
  },
});

export default Store;
