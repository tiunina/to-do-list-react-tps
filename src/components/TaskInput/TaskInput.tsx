import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../redux/operations";
import { AppDispatch } from "../../redux/store";
import { FormValue, Task } from "../../types";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const TaskInput: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const InputSchema = Yup.object().shape({
    text: Yup.string().min(2).required(),
  });
  const { control, handleSubmit, reset, register } = useForm<FormValue>({
    resolver: yupResolver(InputSchema),
    mode: "onChange",
    defaultValues: { text: "" },
  });

  const onSubmit = (data: FormValue) => {
    if (data.text.trim()) {
      const newTask: Task = {
        id: String(Date.now()),
        task: data.text,
        isCompleted: false,
        dueDate: data.dueDate,
      };
      console.log(newTask);
      dispatch(addTaskThunk(newTask));
      reset();
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a Task
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Controller
          name="text"
          control={control}
          defaultValue=""
          // rules={{ required: "Task is required" }}
          render={({ field, fieldState }) => (
            <>
              <TextField
                {...field}
                label="Task"
                variant="outlined"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
              <Typography variant="h6">Due Date</Typography>
              <TextField type="date" {...register("dueDate")} />
            </>
          )}
        />

        <Button type="submit" variant="contained">
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskInput;
