import { useContext, useEffect, useState } from "react";
import List from "@mui/material/List";
import { addTodo, getTodos, deleteTodo } from "./lib/service";
import Todo from "./Components/Todo";
import AddTodo from "./Components/AddTodo";
import { ToastContext } from "./Components/ToastProvider";

function App() {
  const { setToast } = useContext(ToastContext);
  const [todos, setTodos] = useState();
  const [error, setError] = useState(false);

  const handleAddTodo = async (todoInput) => {
    const todo = {
      userId: 1,
      id: todos[todos.length - 1].id + 1,
      title: todoInput,
      completed: false,
    };

    const data = await addTodo(todo);
    if (data) {
      setTodos((prev) => [...prev, todo]);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const deleted = await deleteTodo(todoId);
      if (deleted) {
        setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
        setToast({
          severity: "success",
          message: "Deleted item successfully!",
        });
      }
    } catch (e) {
      setToast({
        severity: "error",
        message: e.message,
      });
    }
  };

  useEffect(() => {
    let isCurrent = false;
    getTodos()
      .then((data) => !isCurrent && setTodos(data.slice(0, 11)))
      .catch(() => {
        if (!isCurrent) {
          setError(true);
        }
      });
    return () => {
      isCurrent = true;
    };
  }, []);
  if (error) {
    return <p>Oops! Something went wrong. Please try again later. </p>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <AddTodo onAdd={handleAddTodo} />
      <List
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "background.paper",
          margin: "0 auto",
        }}
      >
        {todos?.map((todo) => (
          <Todo key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
        ))}
      </List>
    </div>
  );
}

export default App;
