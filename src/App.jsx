import "./App.css";
import TaskList from "./components/TaskList/TaskList.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";

function App() {
  return (
    <>
      <h1>ToDo List</h1>
      <TaskInput />
      <TaskList />
    </>
  );
}

export default App;
