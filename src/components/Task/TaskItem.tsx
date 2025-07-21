import React from "react";
import { useDispatch } from "react-redux";
import s from "./Task.module.css";
import { toggleTask } from "../../redux/taskSlice";
import { deleteTaskThunk, updateTaskThunk } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";
import { Button } from "@mui/material";
import { Task } from "../../types";
interface TaskProps {
  id: string;
  task: string;
  isCompleted: boolean;
  dueDate?: string;
}
const TaskItem: React.FC<TaskProps> = ({ isCompleted, task, id, dueDate }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = (): void => {
    // console.log("Toggling task:", isCompleted);
    dispatch(updateTaskThunk({ id, task, isCompleted: !isCompleted, dueDate }));
  };

  return (
    <li className={s.item}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => handleToggle()}
      />
      <span className={isCompleted ? s.strike : s.task}>{task}</span>

      <div>
        <Button
          variant="contained"
          className={s.btn}
          onClick={() => dispatch(deleteTaskThunk(id))}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;
