import { render, screen, cleanup } from "@testing-library/react";
import Task from "../components/Task/TaskItem";
import { Provider } from "react-redux";
import { store } from "../redux/store";

afterEach(() => {
  cleanup();
});

test("should render task component", () => {
  render(
    <Provider store={store}>
      <Task id="1" task="Test the task" isCompleted={false} />
    </Provider>
  );
  expect(screen.getByText("Test the task")).toBeInTheDocument;
});
