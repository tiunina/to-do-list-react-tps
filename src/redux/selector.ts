import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectFilterByStatus = (state: RootState) =>
  state.tasks.filterByStatus;
export const selectisLoading = (state: RootState) => state.tasks.isLoading;
export const selectFilter = (state: RootState) => state.tasks.filter;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilterByStatus],
  (tasks, filteredTasks) => {
    switch (filteredTasks) {
      case "completed":
        return tasks.filter((task) => task.isCompleted);
      case "active":
        return tasks.filter((task) => !task.isCompleted);
      default:
        return tasks;
    }
  }
);

export const selectUpcomingTask = createSelector([selectTasks], (tasks) => {
  return tasks.filter((task) => {
    if (!task.dueDate || task.isCompleted) return false;
    return new Date(task.dueDate).getTime() > Date.now();
  });
});

export const selectOverdueTask = createSelector([selectTasks], (tasks) => {
  return tasks.filter((task) => {
    if (!task.dueDate || task.isCompleted) return false;
    return new Date(task.dueDate).getTime() < Date.now();
  });
});
