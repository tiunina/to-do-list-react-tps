export interface Task {
  id: string;
  task: string;
  isCompleted: boolean;
  dueDate?: string;
}

export interface TaskState {
  tasks: Task[];
  filter: "all" | "completed" | "active";
  filterByStatus: "all" | "completed" | "active";
  isLoading: boolean;
  isError: boolean | string;
  dueDate?: string;
}

export interface FormValue {
  text: string;
  dueDate?: string;
}
