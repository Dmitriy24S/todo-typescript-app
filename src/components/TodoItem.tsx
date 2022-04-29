import React, { useState, FormEvent, useEffect } from "react";
import { Modal } from "./Modal";
import TodoItemButtons from "./TodoItemButtons";

type TodoItemType = {
  id: number;
  todoText: string;
  complete: boolean;
};

type TodoItemProps = {
  todoItem: TodoItemType;
  handleCheckmark: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
  todoItems: TodoItemType[];
  setTodoItems: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
};

const TodoItem = ({
  todoItem,
  handleCheckmark,
  handleDeleteTodo,
  todoItems,
  setTodoItems,
}: TodoItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newEditedText, setNewEditedText] = useState(todoItem.todoText);

  const changeTodoText = (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    const newTodos = todoItems.map((todo) => {
      if (todo.id === id) {
        todo.todoText = newEditedText;
        return todo;
      }
      return todo;
    });
    setTodoItems(newTodos);
  };

  // Listen for ESC key to close edit text input field
  useEffect(() => {
    const closeEditText = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEditing(false);
      }
    };
    window.addEventListener("keydown", closeEditText);
    return () => {
      window.removeEventListener("keydown", closeEditText);
    };
  }, []);

  return (
    <li
      className={`todo-item flex items-center p-4 px-8 ${
        todoItem.complete ? "bg-green-200" : ""
      }`}
    >
      {/* Todo text / edit todo text input */}
      {isEditing ? (
        <form onSubmit={(e) => changeTodoText(e, todoItem.id)}>
          <input
            aria-label="enter new todo text"
            placeholder="enter new todo text"
            type="text"
            name="text-edit"
            id="text-edit"
            value={newEditedText}
            onChange={(e) => setNewEditedText(e.target.value)}
            className="edit-text-input border-blue-300 border-2 sm:w-auto sm:pl-7"
            autoFocus
            autoComplete="off"
          />
        </form>
      ) : (
        <label
          htmlFor={`checkbox${todoItem.id}`}
          className="flex items-center cursor-pointer"
        >
          <input
            placeholder="checkbox"
            id={`checkbox${todoItem.id}`}
            type="checkbox"
            checked={todoItem.complete}
            onChange={() => {
              handleCheckmark(todoItem.id);
            }}
            className="mr-4 cursor-pointer"
          />
          <p
            className={`break-all pr-2 ${
              todoItem.complete ? "text-slate-400 line-through italic" : ""
            }`}
          >
            {todoItem.todoText}
          </p>
        </label>
      )}
      {/* Todo item buttons edit / delete */}
      <TodoItemButtons
        setIsModalOpen={setIsModalOpen}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        todoItem={todoItem}
        setNewEditedText={setNewEditedText}
        changeTodoText={changeTodoText}
      />
      {/* Modal - confirm todo delete */}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          handleDeleteTodo={handleDeleteTodo}
          id={todoItem.id}
        >
          Delete this todo?
        </Modal>
      )}
    </li>
  );
};

export default TodoItem;
