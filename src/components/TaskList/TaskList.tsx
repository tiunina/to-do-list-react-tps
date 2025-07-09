import React, { useEffect } from "react";
import s from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../../redux/taskSlice";
import Task from "../Task/Task";
import { fetchData } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";
const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

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
