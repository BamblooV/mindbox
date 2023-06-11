import { Filters } from "../../hooks/useTodos"
import { ITodoItem } from "../TodoList/components/TodoItem/TodoItem";

export type IFooter = {
  setFilter: (option: Filters) => void,
  clearCompleted: () => void,
  activeFilter: string,
  data: ITodoItem[]
}

const Footer: React.FC<IFooter> = ({ data, setFilter, activeFilter, clearCompleted }) => {
  const options = Object.values(Filters);
  return (
    <div className="footer">
      <div className="counter">{data.filter(item => item.isDone === false).length} items left</div>
      <div className="filter">
        {options.map(opt => <button
          key={opt}
          className={"btn filter__control " + ((activeFilter === opt) ? "btn-active" : "")}
          onClick={() => setFilter(opt)}
        >{opt}</button>)}
      </div>
      <div className="clear">
        <button onClick={clearCompleted} className="btn clear__control">Clear completed</button>
      </div>
    </div>
  )
}

export default Footer