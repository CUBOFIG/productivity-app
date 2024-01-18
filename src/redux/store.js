import { configureStore } from '@reduxjs/toolkit';
import globalStoreSlice from '../redux/slices/globalStore';

export const saveState = (state) => {
  try {
    const saveState = {
      tasks: state.global.tasks,
      endTasks: state.global.endTasks,
    };

    const serializedState = JSON.stringify(saveState);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};

const Store = configureStore({
  reducer: {
    global: globalStoreSlice,
  },
});

Store.subscribe(() => {
  saveState({
    global: Store.getState().global,
  });
});

export default Store;
