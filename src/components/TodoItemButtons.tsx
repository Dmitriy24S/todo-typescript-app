import React, { FormEvent, MouseEvent, Dispatch, SetStateAction } from "react";
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import Tooltip from "./Tooltip";

type TodoItemType = {
  id: number;
  todoText: string;
  complete: boolean;
};

type TodoItemButtonsProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setNewEditedText: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
  todoItem: TodoItemType;
  changeTodoText: (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
    id: number
  ) => void;
};

const TodoItemButtons = ({
  setIsModalOpen,
  setNewEditedText,
  setIsEditing,
  isEditing,
  todoItem,
  changeTodoText,
}: TodoItemButtonsProps) => {
  return (
    <div className="todo-action-buttons-container ml-auto flex items-center gap-4">
      {isEditing ? (
        // Save button w/ tooltip
        <Tooltip text={"save"}>
          <button
            aria-label="save todo text"
            className={` text-2xl hover:text-blue-800 focus-visible:text-blue-800
    ${todoItem.complete ? "text-slate-400" : "text-blue-900"}`}
            onClick={(e) => changeTodoText(e, todoItem.id)}
          >
            <RiSave3Fill />
          </button>
        </Tooltip>
      ) : (
        // Edit button w/ tooltip
        <Tooltip text={"edit"}>
          <button
            aria-label="edit todo text"
            className={` hover:text-blue-800 focus-visible:text-blue-800
      ${todoItem.complete ? "text-slate-400" : "text-blue-900"}`}
            onClick={() => {
              setIsEditing(!isEditing);
              setNewEditedText(todoItem.todoText);
            }}
          >
            <MdOutlineEditNote className={`text-2xl`} />
          </button>
        </Tooltip>
      )}
      {/* Delete button w/ tooltip */}
      <Tooltip text={"delete"}>
        <button
          aria-label="delete todo"
          onClick={() => setIsModalOpen(true)}
          className={` hover:text-red-500 focus-visible:text-red-500 text-2xl ${
            todoItem.complete ? "text-slate-400" : "text-red-600"
          }`}
        >
          <MdDeleteForever className={`text-2xl `} />
        </button>
      </Tooltip>
    </div>
  );
};

export default TodoItemButtons;
