import Login from "./components/Login";
import { Routes, Route, Link } from "react-router-dom";
import Todo from "./components/Todo";
import Registration from "./components/Registration";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Todo />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
