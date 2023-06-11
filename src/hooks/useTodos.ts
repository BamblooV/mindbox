import { useCallback, useEffect, useRef, useState } from "react";
import { ITodoItem } from "../components/TodoList/components/TodoItem/TodoItem";

export enum Filters {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

const useTodos = (initialData: ITodoItem[] = []) => {
  const [data, setData] = useState<ITodoItem[]>(initialData);
  const counter = useRef(data.length);

  const [todos, setTodos] = useState<ITodoItem[]>(data);
  const [filter, setfilter] = useState(Filters.All);

  const changeStatus = useCallback(
    (id: number, status: boolean) => {
      const item = data.find((item) => item.id === id);

      if (!item) {
        return;
      }

      item.isDone = status;
      setData((prevState) => {
        return [...prevState.filter((item) => item.id !== id), item].sort(
          (item1, item2) => item1.id - item2.id
        );
      });
    },

    [setData, data]
  );

  const editTodo = useCallback(
    (id: number, newText: string) => {
      const item = data.find((item) => item.id === id);

      if (!item) {
        return;
      }

      item.text = newText;
      setData((prevState) => {
        return [...prevState.filter((item) => item.id !== id), item].sort(
          (item1, item2) => item1.id - item2.id
        );
      });
    },
    [data]
  );

  const addTodo = useCallback(
    (text: string) => {
      const item: ITodoItem = {
        id: ++counter.current,
        text,
        isDone: false,
      };
      setData((prevState) => [...prevState, item]);
    },
    [setData]
  );

  const removeTodo = useCallback(
    (id: number) => {
      const item = data.find((item) => item.id === id);

      if (!item) {
        return;
      }
      setData((prevState) => prevState.filter((item) => item.id !== id));
    },
    [setData, data]
  );

  const removeCompleted = useCallback(() => {
    setData((prevState) => prevState.filter((item) => item.isDone === false));
  }, [setData]);

  useEffect(() => {
    switch (filter) {
      case Filters.All:
        setTodos(data);
        break;
      case Filters.Active:
        setTodos(data.filter((item) => item.isDone === false));
        break;
      case Filters.Completed:
        setTodos(data.filter((item) => item.isDone === true));
        break;
    }
  }, [filter, data]);

  return {
    data,
    todos,
    filter,
    setfilter,
    changeStatus,
    editTodo,
    addTodo,
    removeTodo,
    removeCompleted,
  };
};

export default useTodos;
