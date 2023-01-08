const baseUrl = "https://jsonplaceholder.typicode.com";

export async function getTodos() {
  const response = await fetch(`${baseUrl}/todos`);
  const todos = await response.json();

  if (!response.ok) {
    throw new Error("Could not get todo list.");
  }

  return todos;
}

export async function addTodo(todoData) {
  const response = await fetch(`${baseUrl}/todos`, {
    method: "POST",
    body: JSON.stringify(todoData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Could not create todo.");
  }

  return data;
}

export async function editTodo(todoId, todoData) {
  const response = await fetch(`${baseUrl}/todos/${todoId}`, {
    method: "PUT",
    body: JSON.stringify(todoData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Could not edit todo.");
  }

  return data;
}

export async function completeTodo(todoId, completed) {
  const response = await fetch(`${baseUrl}/todos/${todoId}`, {
    method: "PATCH",
    body: JSON.stringify(completed),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Could not edit todo.");
  }

  return data;
}

export async function deleteTodo(todoId) {
  const response = await fetch(`${baseUrl}/todos/${todoId}`, {
    method: "DELETE",
  });
  await response.json();

  if (!response.ok) {
    throw new Error("Could not delete todo.");
  }

  return true;
}
