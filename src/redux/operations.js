import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "http://localhost:3001";

export const fetchData = createAsyncThunk(
  "tasks/fetchAllTasks",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/tasks");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      console.log("Deleting task with ID:", id);
      await axios.delete(`/tasks/${id}`);
      thunkAPI.dispatch(fetchData());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTaskThunk = createAsyncThunk(
  "tasks/addTask",
  async (body, thunkAPI) => {
    try {
      await axios.post("tasks", body);
      thunkAPI.dispatch(fetchData());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
