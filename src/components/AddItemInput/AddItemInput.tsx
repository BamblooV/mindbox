import React, { useCallback, useRef, useState } from 'react'

export type IAddItemInput = {
  addTodo: (text: string) => void;
}

const AddItemInput: React.FC<IAddItemInput> = ({ addTodo }) => {
  const [newItemText, setNewItemText] = useState('');
  const input = useRef<HTMLInputElement>(null)

  const inputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewItemText(e.target.value),
    [setNewItemText])

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo(newItemText.trim());
      setNewItemText('');
      input.current?.focus();
    }
  };

  return (
    <div className="add-todo-item">
      <input
        ref={input}
        value={newItemText}
        onChange={inputHandler}
        onKeyDown={enterHandler}
        type="text"
        className="todos__input"
        placeholder="What needs to be done?"
        autoFocus
      />
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          addTodo(newItemText.trim());
          setNewItemText('');
        }}
        className="btn-plus"
        disabled={!newItemText}
      ></button>
    </div>
  )
}

export default AddItemInput