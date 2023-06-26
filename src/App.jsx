import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

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

  const handleAddTodo = () => {
    if (todo.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: todo,
        isCompleted: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setTodo("");
      updateLocalStorage(updatedTodos);
    }
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

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    updateLocalStorage(newTodos);
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

  return (
    <div className="flex flex-col justify-center items-center pr-3 lg:p-10 gap-10">
      <h1 className="text-4xl font-bold">Todo App</h1>
      <div className="flex items-center justify-center gap-5">
        <TextField
          className="w-48 lg:w-72"
          id="outlined-basic"
          label="Todo"
          variant="outlined"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button
          className="h-10 w-24"
          variant="contained"
          onClick={handleAddTodo}
        >
          Add
        </Button>
      </div>
      <List className="w-full lg:w-1/2">
        {todos.map((todo) => (
          <ListItem key={todo.id} disablePadding>
            {editTodoId === todo.id ? (
              <div className="w-full">
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
              <div className="flex justify-between items-center w-full">
                <ListItemButton
                  role={undefined}
                  onClick={() => handleToggleTodo(todo.id)}
                  className="w-full h-full"
                >
                  <Checkbox checked={todo.isCompleted} disableRipple />
                  <ListItemText
                    primary={todo.text}
                    className="h-full w-10 break-words"
                  />
                </ListItemButton>
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    onClick={() => handleEditTodo(todo.id)}
                    className="h-8 w-20 text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="h-8 w-20 text-sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
