import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import TaskInput from "../components/TaskInput/TaskInput";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

test("should render taskInput component", async () => {
  // render(
  //   <Provider store={store}>
  //     <TaskInput />
  //   </Provider>
  // );

  const { asFragment } = render(
    <Provider store={store}>
      <TaskInput />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot();

  const input = screen.getByLabelText(/task/i);
  fireEvent.change(input, { target: { value: "Learning Testing" } });
  fireEvent.click(screen.getByText(/add task/i));

  await waitFor(() => expect(input).toHaveValue(""));
});
