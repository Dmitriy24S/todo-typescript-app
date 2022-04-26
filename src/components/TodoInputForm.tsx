import { useState, FormEvent } from "react";

type TodoItemType = {
  id: number;
  todoText: string;
  complete: boolean;
};

type TodoInputFormProps = {
  setTodoItems: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
};

const TodoInputForm = ({ setTodoItems }: TodoInputFormProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (inputValue.trim() !== "") {
    if (inputValue.trim()) {
      const newTodoItem = {
        id: Math.random() * 2,
        todoText: inputValue.trim(),
        complete: false,
      };
      setTodoItems((prev) => [...prev, newTodoItem]);
    }
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 pb-8 flex justify-center items-center relative max-w-sm mx-auto"
    >
      <label htmlFor="todo-text" />
      <input
        required
        autoFocus
        id="todo-text"
        type="text"
        value={inputValue}
        placeholder="Add your todo"
        autoComplete="off"
        className="px-4 py-3 w w-full shadow-md rounded-2xl pr-16"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-3 rounded-r-2xl text-white transition-colors bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-500 hover:to-blue-400 absolute right-8"
      >
        Add
      </button>
    </form>
  );
};

export default TodoInputForm;
