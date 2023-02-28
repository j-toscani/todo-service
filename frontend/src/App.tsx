import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import useToDoApi from "./hooks/toDoApi";
import { ApiToDo } from "./types/ToDo.interface";

function App() {
  const { getToDos, createToDo } = useToDoApi();
  const [toDos, setTodos] = useState<ApiToDo[]>([]);

  useEffect(() => {
    fetchTodos()
  }, []);

  async function fetchTodos() {
    const { data } = await getToDos();
    setTodos(data ?? []);
  }

  async function handleSubmit(values: Partial<ApiToDo>) {
    try {
      await createToDo(values);
      await fetchTodos();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Container size="xs">
        <TodoForm handleSubmit={handleSubmit}/>
      </Container>
      <ul>
        {toDos.map((todo, index) => (
          <li key={`${todo.title}-${index}`}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
