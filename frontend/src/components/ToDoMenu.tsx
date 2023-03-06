import { ActionIcon, Menu } from "@mantine/core";
import { IconSettings, IconEdit, IconEraser } from "@tabler/icons-react";

function ToDoMenu(props: { onEdit: () => void; onDelete: () => void }) {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon size="sm" color="blue" variant="filled">
          <IconSettings />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconEdit size={14} onClick={props.onEdit} />}>
          Edit
        </Menu.Item>
        <Menu.Item icon={<IconEraser size={14} />} onClick={props.onDelete}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ToDoMenu;
