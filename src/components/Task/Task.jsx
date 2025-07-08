import React from "react";
import { useDispatch } from "react-redux";
import s from "./Task.module.css";
import { toggleTask } from "../../redux/taskSlice.js";
import { deleteTaskThunk } from "../../redux/operations.js";
const Task = ({ isCompleted, task, id }) => {
  const dispatch = useDispatch();
  return (
    <li className={s.item}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => dispatch(toggleTask(id))}
      />

      <span className={s.task}>{task}</span>
      <div>
        <button className={s.btn} onClick={() => dispatch(deleteTaskThunk(id))}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;
