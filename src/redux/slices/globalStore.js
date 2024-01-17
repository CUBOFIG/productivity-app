import { createSlice } from "@reduxjs/toolkit";

const defaultInitialState = {
  tasks: [],
  endTasks: [],
  currentTask: {},
  actions: {
    changeTask: {
      switch: false,
      index: null,
    },
  },
};

const persistedState = localStorage.getItem("state");
const persistedMainState = localStorage.getItem("master");

if (defaultInitialState) {
  const data = JSON.parse(persistedState);

  defaultInitialState.endTasks = data?.global?.endTasks || [];
  defaultInitialState.tasks = data?.global?.tasks || [];

  console.log(data?.global?.endTasks);
}

if (persistedMainState && defaultInitialState.tasks?.length >= 1) {
  const data = JSON.parse(persistedMainState);
  defaultInitialState.currentTask = data;
}

export const globalStoreSlice = createSlice({
  name: "global",
  initialState: {
    ...defaultInitialState,
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
    generateHistory: (state, action) => {
      state.endTasks = [...state.endTasks, ...action.payload];
    },
    deselectTask: (state) => {
      state.currentTask = {};
    },
    sortByDuration: (state, action) => {
      const mainTasks = state.tasks[0];
      const restArray = state.tasks.slice(1);

      const order = {
        "id-short": ["id-short", "id-medium", "id-long"],
        "id-medium": ["id-medium", "id-long", "id-short"],
        "id-long": ["id-long", "id-medium", "id-short"],
      };

      const sortPriority = order[action.payload];

      const typePriority = sortPriority.reduce((acc, type, index) => {
        acc[type] = index;
        return acc;
      }, {});

      const sortArray = restArray.sort(
        (a, b) => typePriority[a.type] - typePriority[b.type]
      );

      state.tasks = [mainTasks, ...sortArray];
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    updateTasksWithId: (state, action) => {
      const existingIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.data.id
      );

      if (existingIndex !== -1) {
        // Elimina el elemento del lugar actual
        const updatedTasks = [...state.tasks];
        updatedTasks.splice(existingIndex, 1);

        // Inserta el elemento en el nuevo índice
        updatedTasks.splice(action.payload.index, 0, action.payload.data);

        // Actualiza el estado con el nuevo arreglo de tareas
        state.actions.changeTask = {
          switch: false,
          index: 0,
        };
        state.tasks = updatedTasks;
      }
    },
    changeTask: (state, action) => {
      state.actions.changeTask = {
        switch: true,
        index: action.payload,
      };
    },
  },
});

export const { addTask, deleteTask, selectTask } = globalStoreSlice.actions;

export default globalStoreSlice.reducer;
