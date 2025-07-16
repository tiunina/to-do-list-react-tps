export interface Task {
  id: string;
  task: string;
  isCompleted: boolean;
}

export interface TaskState {
  tasks: Task[];
  filter: string;
  filterByStatus: "all" | "completed" | "active";
  isLoading: boolean;
  isError: boolean | string;
}

export interface FormValue {
  text: string;
}
