import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setFilterByStatus } from "../../redux/taskSlice";

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setFilterByStatus("all"));
        }}
      >
        All
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setFilterByStatus("completed"));
        }}
      >
        Completed
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setFilterByStatus("active"));
        }}
      >
        Active
      </Button>
    </div>
  );
};

export default Filter;
