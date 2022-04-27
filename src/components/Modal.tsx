import React, { useEffect } from "react";

type TodoItemType = {
  id: number;
  todoText: string;
  complete: boolean;
};

type ModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteTodo: (id: number) => void;
  id?: number;
  setTodoItems?: React.Dispatch<React.SetStateAction<TodoItemType[]>>;
  children: string;
};

export const Modal = ({
  setIsModalOpen,
  handleDeleteTodo,
  id,
  setTodoItems,
  children,
}: ModalProps) => {
  const handleConfirmDelete = (id: number | null | undefined) => {
    // if recieve todo id - means delete spcific todo
    if (id || id === 0) {
      handleDeleteTodo(id);
    } else {
      // if recieve set state - means delete all todos
      if (setTodoItems) {
        setTodoItems([]);
      }
    }
    setIsModalOpen(false);
  };

  // listen for ESC key to close modal
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
    };
  }, [setIsModalOpen]);

  return (
    <div className="modal-container absolute top-0 left-0 w-full h-full z-10 ">
      {/* modal backdrop with click on it to close modal */}
      <div
        className="modal-backdrop bg-neutral-800 opacity-70 w-full h-full fixed inset-0"
        onClick={() => setIsModalOpen(false)}
      ></div>
      {/* modal */}
      <div className="modal z-20 bg-white absolute min-w-min p-8 py-6 w-8/12 max-w-xs left-0 right-0 mx-auto rounded-lg mt-64">
        {/* modal question */}
        <div className="modal-header text-center">{children}</div>
        {/* confirm / cancel buttons - container */}
        <div className="modal-button-container flex justify-around mt-8">
          {/* confirm */}
          <button
            className="block bg-red-500 text-white py-3 px-4 rounded-md w-24 mr-4 hover:bg-red-600"
            onClick={() => handleConfirmDelete(id)}
          >
            Confirm
          </button>
          {/* cancel */}
          <button
            className="block py-3 px-4 rounded-md shadow w-24 hover:opacity-60"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      {/* modal end */}
    </div>
    // modal container end
  );
};
