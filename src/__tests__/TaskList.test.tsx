import "@testing-library/jest-dom";
import TaskList from "../components/TaskList/TaskList";
import { Provider } from "react-redux";

import { render, screen, cleanup } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "../redux/taskSlice";
import DueDate from "../components/DueDate/DueDate";

// jest.mock("../components/Task/Task", () => (props: any) => (
//   <li>Mocked Task {props.id}</li>
// ));

afterEach(() => {
  cleanup();
});

const preloadedState = {
  tasks: {
    tasks: [
      { id: "1", task: "test", isCompleted: false, dueDate: undefined },
      { id: "2", task: "testpro", isCompleted: true, dueDate: undefined },
    ],
    isLoading: false,
    isError: false,
    filterByStatus: "all",
    filter: "all",
  },
};

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState,
});

// describe("TaskList", () => {
//   it("renders tasks from the Redux store", () => {
//     render(
//       <Provider store={store}>
//         <TaskList />
//       </Provider>
//     );

//     expect(screen.getByText("Test 1")).toBeInTheDocument();
//     expect(screen.getByText("Test 2")).toBeInTheDocument();
//   });
// });

describe("TaskList", () => {
  it("renders tasks and matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    expect(screen.getByText(/testpro/i)).toBeInTheDocument();
  });
});
