import { createSlice } from "@reduxjs/toolkit";
import { getInitialState } from "../../utils/mixin";

//Estado inicial default

const defaultInitialState = {
  tasks: [],
  endTasks: [],
  currentTask: {},
  actions: {
    changeTask: {
      switch: false,
      data: null,
    },
  },
};

//El initialState se crea con el estado inicial default y se le pasa a la funcion getInitialState para que se le agreguen las funciones de persistencia.
//Esta funcion obtiene el estado del localStorage y lo agrega al estado inicial default.

export const globalStoreSlice = createSlice({
  name: "global",
  initialState: {
    ...getInitialState(defaultInitialState),
  },
  reducers: {
    //Aca se crean las funciones que modifican el estado global.
    addTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTask: (state, action) => {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );

      state.tasks = filteredTasks;

      if (!filteredTasks.length || state.currentTask.id === action.payload) {
        state.currentTask = filteredTasks.length > 0 ? filteredTasks[0] : {};
      }
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );

      if (state.currentTask.id === action.payload.id)
        state.currentTask = action.payload;
    },
    selectTask: (state) => {
      state.currentTask = state.tasks[0];
    },
    completeCurrentTask: (state, action) => {
      if (action.payload?.id) {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );

        state.endTasks = [
          ...state.endTasks,
          {
            ...action.payload,
            completedAt: new Date().toISOString(),
          },
        ];

        state.currentTask = state.tasks.length > 0 ? state.tasks[0] : {};
      }
    },
    completeListTask: (state, action) => {
      if (action.payload?.id) {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );

        state.endTasks = [
          ...state.endTasks,
          {
            ...action.payload,
            remainingTime: action.payload.duration,
            completedAt: new Date().toISOString(),
          },
        ];
      }
    },
    updateCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    generateHistory: (state, action) => {
      state.endTasks = [...state.endTasks, ...action.payload];
    },
    deselectTask: (state) => {
      state.currentTask = {};
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateTasksWithId: (state, action) => {
      const newTasks = action.payload.tasks.map((task) =>
        task.id === action.payload.data.id ? action.payload.data : task
      );

      state.tasks = newTasks;
      state.currentTask = newTasks[0];

      state.actions.changeTask = {
        switch: false,
        data: null,
      };
    },
    changeTask: (state, action) => {
      state.actions.changeTask = {
        switch: true,
        data: action.payload,
      };
    },
  },
});

export default globalStoreSlice.reducer;
