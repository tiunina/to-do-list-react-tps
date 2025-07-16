import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  addTaskThunk,
  deleteTaskThunk,
  fetchData,
  updateTaskThunk,
} from "./operations";
import { Task, TaskState } from "../types";
import type { RootState } from "./store";

const INITIAL_STATE: TaskState = {
  tasks: [],
  filter: "",
  filterByStatus: "all",
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {
    toggleTask: (state, action: PayloadAction<string>) => {
      const item = state.tasks.find((item) => item.id === action.payload);
      if (item) {
        item.isCompleted = !item.isCompleted;
      }
    },

    setFilterByStatus: (
      state,
      action: PayloadAction<"all" | "completed" | "active">
    ) => {
      state.filterByStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(
        deleteTaskThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter(
            (item) => item.id !== action.payload
          );
          state.isLoading = false;
        }
      )
      .addCase(addTaskThunk.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
        state.isLoading = false;
      })
      .addCase(
        updateTaskThunk.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const item = state.tasks.find(
            (item) => item.id === action.payload.id
          );
          if (item) {
            item.task = action.payload.task;
            item.isCompleted = action.payload.isCompleted;
          }
        }
      )
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
          state.isError = (action.payload as string) || "Something went wrong";
        }
      );
  },
});

export const taskReducer = slice.reducer;
export const { toggleTask, setFilterByStatus } = slice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
