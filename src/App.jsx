import Login from "./components/Login";
import { Routes, Route, Link } from "react-router-dom";
import Todo from "./components/Todo";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import TodoItem from "./components/TodoItem";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Todo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todo/:id" element={<TodoItem />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
