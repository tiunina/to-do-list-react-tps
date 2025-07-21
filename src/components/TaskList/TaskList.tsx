import React, { useEffect } from "react";
import s from "./TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../../redux/taskSlice";
import TaskItem from "../Task/TaskItem";
import { fetchData } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";
import { selectFilter, selectFilteredTasks } from "../../redux/selector";
const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  // const tasks = useSelector(selectTasks);
  const tasks = useSelector(selectFilteredTasks);

  const filter = useSelector(selectFilter);

  const filterData =
    filter === "all"
      ? tasks
      : tasks.filter((task) =>
          task.task.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <ul className={s.list}>
      {filterData?.map((item) => {
        if (!item || !item.id) return null;
        return <TaskItem key={item.id} {...item} />;
      })}
    </ul>
  );
};

export default TaskList;
