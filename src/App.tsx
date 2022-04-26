import { useState } from "react";
import TodoInputForm from "./components/TodoInputForm";
import TodoList from "./components/TodoList";
import { todosData } from "./data/todosData";

type TodoItemType = {
  id: number;
  todoText: string;
  complete: boolean;
};

function App() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>(todosData);

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="App min-h-screen w-full overflow-hidden px-4 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="todo bg-white max-w-lg mx-auto mt-24 pb-4 rounded-md px-6 mb-6">
        <h1
          className="pt-8 text-center text-2xl uppercase tracking-widest cursor-pointer"
          onClick={reloadPage}
        >
          Todo list
        </h1>
        <TodoInputForm setTodoItems={setTodoItems} />
        <TodoList todoItems={todoItems} setTodoItems={setTodoItems} />
        <section></section>
      </div>
    </div>
  );
}

export default App;
