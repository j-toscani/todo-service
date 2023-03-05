import {
  Checkbox,
  Text,
  Collapse,
  Grid,
  Divider,
  ActionIcon,
  Paper,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ChangeEvent, useState } from "react";
import useToDoApi from "../hooks/toDoApi";
import { ApiToDo } from "../types/ToDo.interface";

function ToDoCard(props: { todo: ApiToDo; onUpdate: () => void }) {
  const { updateToDo } = useToDoApi();
  const [opened, { toggle }] = useDisclosure(false);
  const [done, setDone] = useState(props.todo.done);

  function handleDone(event: ChangeEvent) {
    if (!props.todo?._id) throw new Error("ID missing!");

    const done = (event.target as HTMLInputElement).checked;

    updateToDo({ done }, props.todo._id)
      .then((res) => {
        setDone(done);
        props.onUpdate();
      })
      .catch(console.error);
  }

  return (
    <Paper shadow="sm" p="md" radius="md">
      <Grid align="center">
        <Grid.Col span="content">
          <Checkbox checked={done} onChange={handleDone} />
        </Grid.Col>
        <Grid.Col span="auto">
          <Text fz="lg">{props.todo.title}</Text>
        </Grid.Col>
        <Grid.Col span="content">
          <ActionIcon size="sm" color="blue" variant="filled" onClick={toggle}>
            <IconChevronDown />
          </ActionIcon>
        </Grid.Col>
      </Grid>

      <Collapse in={opened}>
        <Divider my="sm"></Divider>
        <Text size="sm" color="dimmed">
          {props.todo.description}
        </Text>
      </Collapse>
    </Paper>
  );
}

export default ToDoCard;
