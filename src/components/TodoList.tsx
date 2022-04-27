import { useState } from "react";
import TodoItem from "../components/TodoItem";
import { Modal } from "./Modal";

type TodoItemType = {
  id: number;
  todoText: string;
  complete: boolean;
};

type TodoListProps = {
  setTodoItems: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  todoItems: TodoItemType[];
};

const TodoList = ({ todoItems, setTodoItems }: TodoListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const remainingTodos = todoItems.filter((todo) => !todo.complete).length;

  const handleCheckmark = (id: number) => {
    const updatedTodoList = todoItems.map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
        return todo;
      }
      return todo;
    });
    setTodoItems(updatedTodoList);
  };

  const handleDeleteTodo = (id: number) => {
    const updateTodoList = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(updateTodoList);
  };

  if (todoItems.length < 1) {
    return <p className="pb-4 text-center">Your todo list is empty</p>;
  }

  return (
    <>
      <ul className="todo-items-list divide-y divide-blue-200 rounded-lg overflow-hidden">
        {todoItems.map((todoItem, index) => {
          return (
            <TodoItem
              key={index}
              todoItem={todoItem}
              handleCheckmark={handleCheckmark}
              handleDeleteTodo={handleDeleteTodo}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          );
        })}
      </ul>
      {/* todo list footer */}
      <div className="todo-list-footer flex justify-between mt-6 text-slate-400 text-sm">
        <div className="todo-remaining  ">{`${remainingTodos} todos left`}</div>
        <button
          className="hover:text-red-600"
          onClick={() => setIsModalOpen(true)}
        >
          Clear all
        </button>
      </div>
      {/* modal - confirm delete all todos */}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          handleDeleteTodo={handleDeleteTodo}
          setTodoItems={setTodoItems}
        >
          Delete all todos?
        </Modal>
      )}
    </>
  );
};

export default TodoList;
