import React from "react";
import { useSelector } from "react-redux";
import { selectOverdueTask, selectUpcomingTask } from "../../redux/selector";

const DueDate = () => {
  const overdueTasks = useSelector(selectOverdueTask);
  const upcomingTasks = useSelector(selectUpcomingTask);

  return (
    <div>
      <h2>🚨 Overdue Tasks</h2>
      <ul>
        {overdueTasks.map((task) => (
          <li key={task.id}>
            {task.task} (Due: {task.dueDate})
          </li>
        ))}
      </ul>
      <h2>📅 Upcoming Tasks</h2>
      <ul>
        {upcomingTasks.map((task) => (
          <li key={task.id}>
            {task.task} (Due: {task.dueDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DueDate;
