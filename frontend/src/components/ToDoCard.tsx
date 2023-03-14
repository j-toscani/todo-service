import {
  Checkbox,
  Text,
  Collapse,
  Grid,
  Divider,
  ActionIcon,
  Paper,
  Group,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";
import useToDoApi from "../hooks/toDoApi";
import ToDoMenu from "./ToDoMenu";
import { ApiToDo } from "../types/ToDo.interface";

function ToDoCard(props: { todo: ApiToDo; onUpdate: () => void }) {
  const { updateToDo, deleteToDo } = useToDoApi();

  const [opened, { toggle }] = useDisclosure(false);
  const [done, setDone] = useState(props.todo.done);

  function handleDone(event: ChangeEvent) {
    if (!props.todo?._id) throw new Error("ID missing!");

    const done = (event.target as HTMLInputElement).checked;
    setDone(done);

    updateToDo({ done }, props.todo._id)
      .then((_res) => {
        props.onUpdate();
      })
      .catch(console.error);
  }

  function handleEdit() {
    console.debug("Editing...");
  }

  function handleDelete() {
    if (!props.todo?._id) throw new Error("ID missing!");

    deleteToDo(props.todo._id)
      .then((_res) => {
        props.onUpdate();
      })
      .catch(console.error);
  }

  return (
    <Paper shadow="sm" p="md" radius="md">
      <Grid align="center">
        <Grid.Col span="content">
          <Checkbox
            checked={done}
            onChange={handleDone}
            styles={{ input: { cursor: "pointer" } }}
          />
        </Grid.Col>
        <Grid.Col span="auto">
          <Text fz="lg" strikethrough={done}>
            {props.todo.title}
          </Text>
        </Grid.Col>
        <Grid.Col span="content">
          <Group spacing="xs">
            <ActionIcon
              size="sm"
              color="blue"
              variant="filled"
              onClick={toggle}
            >
              <IconChevronDown
                style={{
                  transform: `scaleY(${opened ? -1 : 1})`,
                  transition: "transform 0.1s ease-out",
                }}
              />
            </ActionIcon>

            <ToDoMenu onDelete={handleDelete} onEdit={handleEdit} />
          </Group>
        </Grid.Col>
      </Grid>

      <Collapse in={opened}>
        <Divider my="sm"></Divider>
        <Text size="sm" strikethrough={done}>
          {props.todo.description}
        </Text>
      </Collapse>
    </Paper>
  );
}

export default ToDoCard;
