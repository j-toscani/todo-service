import {
  TextInput,
  Textarea,
  Button,
  Container,
  Stack,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";

function App() {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  return (
    <div className="App">
      <Container size="xs">
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            form.reset();
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
      </Container>
    </div>
  );
}

export default App;
