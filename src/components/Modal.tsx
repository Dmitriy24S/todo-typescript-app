import React, { useEffect, useRef } from "react";

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
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", closeModal);
    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  }, [setIsModalOpen]);

  // Trap focus in modal
  const modalRef = useRef<any>(null); // ! any ?

  const trapFocusInModal = (e: any) => {
    // ! any ?
    if (e.key !== "Tab") return;

    const focusableModalElements = modalRef.current.querySelectorAll(
      "a[href], button:not([disabled]), textarea, input, select"
    );

    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    // if going forward by pressing tab and lastElement is active shift focus to first focusable element
    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    // if going backward by pressing tab and firstElement is active shift focus to last focusable element
    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  return (
    <div
      className="modal-container absolute top-0 left-0 w-full h-full z-10 "
      onKeyDown={trapFocusInModal}
      ref={modalRef}
    >
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
        <div
          className="modal-button-container flex justify-around mt-8"
          // ref={modalRef}
        >
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
