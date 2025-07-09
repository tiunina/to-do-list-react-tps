import React from "react";
import { useDispatch } from "react-redux";
import s from "./Task.module.css";
import { toggleTask } from "../../redux/taskSlice";
import { deleteTaskThunk } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";

interface TaskProps {
  id: string;
  task: string;
  isCompleted: boolean;
}
const Task: React.FC<TaskProps> = ({ isCompleted, task, id }) => {
  const dispatch = useDispatch<AppDispatch>();
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
