import { Container } from "@mantine/core";
import TodoForm from "./components/TodoForm";
import useToDoApi from "./hooks/toDoApi";

function App() {
  const { createToDo } = useToDoApi();

  return (
    <div>
      <Container size="xs">
        <TodoForm handleSubmit={createToDo}/>
      </Container>
    </div>
  );
}

export default App;
