import AddItemInput from "./components/AddItemInput/AddItemInput"
import Footer from "./components/Footer/Footer"
import { ITodoItem } from "./components/TodoList/components/TodoItem/TodoItem"
import TodoList from "./components/TodoList/TodoList"
import useTodos from "./hooks/useTodos"
import "./styles.css"

const initialValue: ITodoItem[] = [
  {
    id: 1,
    text: "Hello",
    isDone: false
  },
  {
    id: 2,
    text: "World",
    isDone: true
  },
  {
    id: 3,
    text: "Walk the dog",
    isDone: false
  },
]

function App() {
  const {
    data,
    todos,
    changeStatus,
    addTodo,
    filter,
    setfilter,
    removeTodo,
    removeCompleted,
    editTodo
  } = useTodos(initialValue);

  return (
    <main className="container">
      <h1 className="title">todos</h1>
      <div className="todos">
        <AddItemInput addTodo={addTodo} />
        <TodoList todos={todos} toggleStatus={changeStatus} editTodo={editTodo} removeTodo={removeTodo} />

        <Footer data={data} setFilter={setfilter} activeFilter={filter} clearCompleted={removeCompleted} />
      </div>
    </main>
  )
}

export default App
