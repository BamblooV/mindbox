import { useCallback, useState } from "react";

export type ITodoItem = {
  id: number,
  text: string,
  isDone: boolean,
};

export type ICallback = {
  onCheckboxClick: (id: number, status: boolean) => void,
  editTodo: (id: number, newText: string) => void,
  removeTodo: (id: number) => void,
}

const TodoItem: React.FC<ITodoItem & ICallback> = ({ id, text, isDone, onCheckboxClick, editTodo, removeTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(text);

  const chekboxHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    onCheckboxClick(id, e.target.checked)
  }, [onCheckboxClick, id])

  const editHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewText(e.target.value)

  }, [setNewText]);

  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setEditMode(false);
      editTodo(id, newText);
    }
  };

  const loseFocusHandler = useCallback(() => {
    editTodo(id, newText);
    setEditMode(false);
  }, [newText, setEditMode])

  return (
    <li className="todos_item">
      <input checked={isDone} type="checkbox" id={String(id)} className="item__checkbox" onChange={chekboxHandler} />
      <label htmlFor={String(id)} className="item__label"></label>
      {editMode
        ? <input type="text" value={newText} className="item__edit" onChange={editHandler} onKeyDown={enterHandler} onBlur={loseFocusHandler} autoFocus />
        : <p onDoubleClick={() => { setEditMode(prevState => !prevState) }} className="item__text">{text}</p>
      }
      <button className="btn btn-cross" onClick={() => removeTodo(id)}>[X]</button>
    </li>
  )
}

export default TodoItem