// src/components/Filter/Filter.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Filter from "../components/Filter/Filter";
import { taskReducer } from "../redux/taskSlice";

describe("Filter component", () => {
  const createStore = (preloadedState = {}) =>
    configureStore({
      reducer: { tasks: taskReducer },
      preloadedState: {
        tasks: {
          tasks: [],
          isLoading: false,
          isError: false,
          filterByStatus: "all",
          filter: "all",
          ...preloadedState,
        },
      },
    });

  const renderWithProvider = (store: ReturnType<typeof createStore>) =>
    render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );

  it("renders all three filter buttons", () => {
    const store = createStore();
    renderWithProvider(store);
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  it("dispatches setFilterByStatus on button click and updates state", () => {
    const store = createStore();
    renderWithProvider(store);

    const completedButton = screen.getByText(/completed/i);
    fireEvent.click(completedButton);

    const state = store.getState();
    expect(state.tasks.filterByStatus).toBe("completed");
  });

  it("matches snapshot", () => {
    const store = createStore();
    const { asFragment } = render(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
