import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../redux/operations.js";
import * as Yup from "yup";

const TaskInput = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if (data.text.trim()) {
      const newTask = {
        id: Date.now(),
        task: data.text,
        isCompleted: false,
      };
      console.log(newTask);
      dispatch(addTaskThunk(newTask));
      reset();
    }
  };

  const InputSchema = Yup.object().shape({
    taskInput: Yup.string().min(2).required("Це поле обов'язкове!"),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="taskInput"
        placeholder="Add a task..."
        {...register("text", { required: true })}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskInput;
