export interface Task {
  id: string;
  task: string;
  isCompleted: boolean;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean | string;
}

export interface FormValue {
  text: string;
}
