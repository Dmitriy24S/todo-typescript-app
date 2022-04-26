import TodoItem from "../components/TodoItem";

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
            />
          );
        })}
      </ul>
      <div className="todo-remaining mt-6 text-slate-400 text-sm">{`${remainingTodos} todos left`}</div>
    </>
  );
};

export default TodoList;
