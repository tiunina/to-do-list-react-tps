import React, { useEffect } from "react";
import s from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../../redux/taskSlice.js";
import Task from "../Task/Task.jsx";
import { fetchData } from "../../redux/operations.js";
const TaskList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const tasks = useSelector(selectTasks);
  return (
    <ul className={s.list}>
      {tasks?.map((item) => {
        if (!item || !item.id) return null;
        return <Task key={item.id} {...item} />;
      })}
    </ul>
  );
};

export default TaskList;
