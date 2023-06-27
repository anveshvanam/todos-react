import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import { Routes, Route, Link } from "react-router-dom";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <ProtectedRoute path="/" element={<Todo />} />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
