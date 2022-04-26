type TodoItemType = {
  id: number;
  todoText: string;
  complete: boolean;
};

type TodoItemProps = {
  todoItem: TodoItemType;
  handleCheckmark: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
};

const TodoItem = ({
  todoItem,
  handleCheckmark,
  handleDeleteTodo,
}: TodoItemProps) => {
  return (
    <li
      className={`todo-item flex items-center p-4 px-8 ${
        todoItem.complete ? "bg-green-200" : ""
      }`}
    >
      <label
        htmlFor={`checkbox${todoItem.id}`}
        className="flex items-center cursor-pointer"
      >
        <input
          placeholder="checkbox"
          id={`checkbox${todoItem.id}`}
          type="checkbox"
          checked={todoItem.complete}
          readOnly
          onClick={() => {
            handleCheckmark(todoItem.id);
          }}
          className="mr-4 cursor-pointer"
        />
        <p
          className={
            todoItem.complete ? "text-slate-400 line-through italic" : ""
          }
        >
          {todoItem.todoText}
        </p>
      </label>
      <button
        className="inline-block bg-red-600 text-white px-4 py-2 rounded ml-auto hover:bg-red-500"
        onClick={() => handleDeleteTodo(todoItem.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
