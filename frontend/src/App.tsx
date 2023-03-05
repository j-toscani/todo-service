import { Container, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import ToDoCard from "./components/ToDoCard";
import TodoForm from "./components/TodoForm";
import useToDoApi from "./hooks/toDoApi";
import { ApiToDo } from "./types/ToDo.interface";

function App() {
  const { createToDo, getToDos } = useToDoApi();

  const [todos, setTodos] = useState<ApiToDo[]>([]);

  useEffect(() => {
    fetchToDos();
  }, []);

  function fetchToDos() {
    getToDos()
      .then((response) => {
        if (!response.data) return;
        setTodos(response.data);
      })
      .catch(console.error);
  }

  return (
    <div>
      <Container size="xs">
        <TodoForm handleSubmit={createToDo} />
        <Stack spacing="md">
          {todos.map((todo) => (
            <ToDoCard todo={todo} key={todo._id} onUpdate={fetchToDos} />
          ))}
        </Stack>
      </Container>
    </div>
  );
}

export default App;
