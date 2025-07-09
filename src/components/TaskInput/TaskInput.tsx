import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";
import { Task } from "../../types";

interface FormValue {
  text: string;
}

const TaskInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, reset } = useForm<FormValue>();

  const onSubmit = (data: FormValue) => {
    if (data.text.trim()) {
      const newTask: Task = {
        id: String(Date.now()),
        task: data.text,
        isCompleted: false,
      };
      console.log(newTask);
      dispatch(addTaskThunk(newTask));
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Add a task..."
        {...register("text", { required: true })}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskInput;
