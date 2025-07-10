import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../types";

axios.defaults.baseURL = "http://localhost:3001";

export const fetchData = createAsyncThunk<Task[], void>(
  "tasks/fetchAllTasks",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<Task[]>("/tasks");
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk<string, string>(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      console.log("Deleting task with ID:", id);
      await axios.delete(`/tasks/${id}`);
      return id;
      // thunkAPI.dispatch(fetchData());
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTaskThunk = createAsyncThunk<Task, Task>(
  "tasks/addTask",
  async (body, thunkAPI) => {
    try {
      const response = await axios.post<Task>("tasks", body);
      return response.data;
      // thunkAPI.dispatch(fetchData());
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const updateTaskThunk = createAsyncThunk<Task, Task>(
//   "tasks/updateTask",
//   async (body, thunkAPI) => {
//     try {
//       const { data } = await axios.put(`/tasks/${body.id}`, body);
//       return data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
