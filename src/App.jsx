import { useMemo, useState } from "react";

function App() {
  const [taskText, setTaskText] = useState("");
  const [todos, setTodos] = useState([]);

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  const addTodo = (event) => {
    event.preventDefault();
    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    setTodos((current) => [
      ...current,
      { id: crypto.randomUUID(), text: trimmedText, completed: false },
    ]);
    setTaskText("");
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  return (
    <main className="todo-app">
      <h1>Just a Simple Todo</h1>
      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a task..."
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <p className="todo-count">
        {remainingCount} task{remainingCount === 1 ? "" : "s"} left
      </p>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button type="button" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
