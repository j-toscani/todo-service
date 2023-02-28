import { TextInput, Textarea, Button, Stack, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import useToDoApi, { ApiResult } from "../hooks/toDoApi";
import { ApiToDo, ToDoStatus } from "../types/ToDo.interface";

function TodoForm(props: { id?: string, handleSubmit: (values: Partial<ApiToDo>) => Promise<ApiResult<ApiToDo>> | Promise<void>}) {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        props.handleSubmit({ ...values, status: ToDoStatus.NEW })
          .then(() => form.reset())
          .catch(console.error);
      })}
    >
      <Stack>
        <TextInput
          label="Summary:"
          placeholder="Wash car."
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Description:"
          {...form.getInputProps("description")}
          placeholder="We want to go away for the weekend. Wash the car so it`ll be nicer to drive with"
          minRows={6}
        />
        <Center>
          <Button type="submit"> Submit </Button>
        </Center>
      </Stack>
    </form>
  );
}

export default TodoForm;
