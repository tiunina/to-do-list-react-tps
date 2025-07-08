import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addTaskThunk, deleteTaskThunk, fetchData } from "./operations.js";

const INITIAL_STATE = {
  tasks: [],
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {
    // deleteTask: (state, action) => {
    //   state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    // },

    // addTask: (state, action) => {
    //   state.tasks.push(action.payload);
    // },

    toggleTask: (state, action) => {
      const item = state.tasks.find((item) => item.id === action.payload);
      item.isCompleted = !item.isCompleted;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((item) => item.id !== action.payload);
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchData.pending,
          deleteTaskThunk.pending,
          addTaskThunk.pending
        ),
        (state, action) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchData.rejected,
          deleteTaskThunk.rejected,
          addTaskThunk.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

export const taskReducer = slice.reducer;
export const { toggleTask } = slice.actions;

export const selectTasks = (state) => state.tasks.tasks;
