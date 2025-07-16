import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import TaskInput from "./components/TaskInput/TaskInput";
import Filter from "./components/Filter/Filter";

function App() {
  return (
    <>
      <h1>ToDo List</h1>
      <Filter />
      <TaskInput />
      <TaskList />
    </>
  );
}

export default App;
