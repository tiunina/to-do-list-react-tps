import React from "react";
import { useDispatch } from "react-redux";
import s from "./Task.module.css";
import { toggleTask } from "../../redux/taskSlice";
import { deleteTaskThunk } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";
import { Button } from "@mui/material";
// import { FormValue, Task } from "../../types";
interface TaskProps {
  id: string;
  task: string;
  isCompleted: boolean;
}
const Task: React.FC<TaskProps> = ({ isCompleted, task, id }) => {
  const dispatch = useDispatch<AppDispatch>();

  // const onChange = (data: FormValue) => {
  //   if (data.text.trim()) {
  //     const updatedTask: Task = {
  //       id: String(Date.now()),
  //       task: data.text,
  //       isCompleted: false,
  //     };
  //     dispatch(updateTaskThunk(updatedTask));

  //   }
  // };

  return (
    <li className={s.item}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => dispatch(toggleTask(id))}
      />

      <span className={s.task}>{task}</span>
      <div>
        {/* <button className={s.btn} onClick={() => dispatch(deleteTaskThunk(id))}>
          Delete
        </button> */}
        <Button
          variant="contained"
          className={s.btn}
          onClick={() => dispatch(deleteTaskThunk(id))}
        >
          Delete
        </Button>

        {/* <Button variant="contained" className={s.btn} onClick={onChange}>
          Change
        </Button> */}
      </div>
    </li>
  );
};

export default Task;
