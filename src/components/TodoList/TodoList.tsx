import TodoItem, { ITodoItem } from './components/TodoItem/TodoItem'
import React from 'react'

export type ITodoList = {
  todos: ITodoItem[],
  toggleStatus: (id: number, status: boolean) => void,
  editTodo: (id: number, newText: string) => void,
  removeTodo: (id: number) => void
}

const TodoList: React.FC<ITodoList> = ({ todos, toggleStatus, editTodo, removeTodo }) => {

  return (
    <ul className="todos__list">
      {todos.map(item => <TodoItem key={item.id} {...item} onCheckboxClick={toggleStatus} editTodo={editTodo} removeTodo={removeTodo} />
      )}
    </ul>
  )
}

export default TodoList