import { createSlice } from "@reduxjs/toolkit";

export const globalStoreSlice = createSlice({
  name: "global",
  initialState: {
    tasks: [],
    endTasks: [],
    currentTask: {},
    actions: {
      changeTask: 0,
    },
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);

      if (state.currentTask.id === action.payload) {
        state.currentTask = {};
      }
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    selectTask: (state, action) => {
      state.currentTask = state.tasks.find(
        (task) => task.id === action.payload
      );
    },
    completeTask: (state, action) => {
      const taskIdToComplete = action.payload;
      const completedTask = state.tasks.find(
        (task) => task.id === taskIdToComplete
      );

      if (completedTask) {
        state.tasks = state.tasks.filter(
          (task) => task.id !== taskIdToComplete
        );

        state.endTasks = [
          ...state.endTasks,
          {
            ...completedTask,
            completedAt: new Date().toISOString(),
          },
        ];

        state.currentTask = {};
      }
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    deselectTask: (state) => {
      state.currentTask = {};
    },
    changeTask: (state) => {
      state.actions.changeTask = state.actions.changeTask + 1;
    },
  },
});

export const { addTask, deleteTask, selectTask } = globalStoreSlice.actions;

export default globalStoreSlice.reducer;
