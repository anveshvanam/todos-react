import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

const TodoItem = () => {
  const { id } = useParams();
  const [todoItem, setTodoItem] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const updateLocalStorage = (updatedTodos) => {
    if (localStorage) {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const handleDeleteTodo = (id) => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    updateLocalStorage(newTodos);
    navigate("/");
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditTodoId(id);
      setEditTodoText(todoToEdit.text);
    }
  };

  const handleSaveEditTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editTodoId) {
        return { ...todo, text: editTodoText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
    setEditTodoId(null);
    setEditTodoText("");
  };

  const handleCancelEditTodo = () => {
    setEditTodoId(null);
    setEditTodoText("");
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const parsedTodos = JSON.parse(storedTodos);
    console.log(storedTodos);
    const todoItem = parsedTodos.find((todo) => todo.id === id);
    setTodoItem(todoItem);
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {todoItem && (
        <>
          {editTodoId === todoItem.id ? (
            <div className="w-[95%] lg:w-1/2">
              <TextField
                value={editTodoText}
                onChange={(e) => setEditTodoText(e.target.value)}
                className=" w-full"
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outlined"
                  className="h-10 w-24"
                  onClick={handleSaveEditTodo}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  className="h-10 w-24"
                  onClick={handleCancelEditTodo}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center w-[95%] lg:w-1/2">
              <div className="flex w-full">
                <ListItemButton
                  role={undefined}
                  onClick={() => handleToggleTodo(todoItem.id)}
                  className="w-full h-full"
                >
                  <Checkbox checked={todoItem.isCompleted} disableRipple />
                  <ListItemText
                    primary={todoItem.text}
                    className="h-full w-10 break-words"
                  />
                </ListItemButton>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  className="h-8 w-20 text-xs  lg:text-4xl"
                >
                  <Link to={`/todo/${todoItem.id}`}>View</Link>
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleEditTodo(todoItem.id)}
                  className="h-8 w-20 text-xs  lg:text-4xl"
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteTodo(todoItem.id)}
                  className="h-8 w-20 text-sm"
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TodoItem;
