import { Container, Stack, Title, Text, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import ToDoCard from "./components/ToDoCard";
import TodoForm from "./components/TodoForm";
import useToDoApi from "./hooks/toDoApi";
import { ApiToDo } from "./types/ToDo.interface";

function App() {
  const { createToDo, getToDos } = useToDoApi();

  const [todos, setToDos] = useState<ApiToDo[]>([]);

  useEffect(() => {
    fetchToDos();
  }, []);

  async function fetchToDos() {
    const todos = await getToDos();
    
    if (todos.data) {
      setToDos(todos.data);
    } else {
      console.error(todos.error);
    }
  }

  return (
    <div>
      <Container size="xs">
        <TodoForm handleSubmit={createToDo} />
        <Box my={"xl"}>
          {todos.length === 0 && (
            <Box my="md">
              <Text fz={"xl"} align="center">
                No ToDos yet.
              </Text>
              <Text align="center">
                Click the '+' icon to create your first ToDo!
              </Text>
            </Box>
          )}

          {todos.length > 0 &&
            todos.map((todo) => (
              <ToDoCard todo={todo} key={todo._id} onUpdate={fetchToDos} />
            ))}
        </Box>
      </Container>
    </div>
  );
}

export default App;
