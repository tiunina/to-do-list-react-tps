import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import TaskInput from "./components/TaskInput/TaskInput";
import Filter from "./components/Filter/Filter";
import DueDate from "./components/DueDate/DueDate";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

function App() {
  return (
    <>
      <ThemeToggle />
      <h1>ToDo List</h1>
      <Filter />
      <TaskInput />
      <TaskList />

      <DueDate />
    </>
  );
}

export default App;
