import { createSlice } from '@reduxjs/toolkit';

function createData(description, duration) {
  const id = crypto.randomUUID();

  return {
    description,
    durationChoice: {
      id: null,
      name: '',
    },
    customDuration: duration,
    id,
  };
}

const data = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbrea2d', 356),
  createData('Gingerbr23ead', 356),
  createData('Gingerbr34ead', 356),
  createData('Gingerb12read', 356),
];

export const globalStoreSlice = createSlice({
  name: 'global',
  initialState: {
    tasks: data,
    endTask: [],
    currentTask: {},
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTask: (state, action) => {
      console.log(action.payload);

      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    selectTask: (state, action) => {
      state.currentTask = action.payload;
    },
    completeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.endTask = [...state.endTask, action.payload];
    },
  },
});

export const { addTask, deleteTask, selectTask } = globalStoreSlice.actions;

export default globalStoreSlice.reducer;
