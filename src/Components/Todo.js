import { useContext, useState } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditDialog from "./EditDialog";
import { ToastContext } from "./ToastProvider";
import { completeTodo } from "../lib/service";

export default function Todo({ todo, onDelete }) {
  const { setToast } = useContext(ToastContext);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const labelId = `checkbox-list-label-${todo.id}`;

  const handleToggle = async (e) => {
    try {
      const data = await completeTodo(todo.id, {
        completed: e.target.checked,
      });
      if (data) setCompleted((prev) => !prev);
    } catch (e) {
      setToast({
        severity: "error",
        message: e.message,
      });
    }
  };

  const handleEdit = (editedTitle, editedCompleted) => {
    setTitle(editedTitle);
    setCompleted(editedCompleted);
  };

  const finalTodo = { ...todo, title, completed };

  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={title} />
      </ListItemButton>
      <IconButton
        aria-label="edit"
        color="primary"
        onClick={() => setOpenEditDialog(true)}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        color="primary"
        onClick={() => onDelete(todo.id)}
      >
        <DeleteIcon />
      </IconButton>
      {openEditDialog && (
        <EditDialog
          open={openEditDialog}
          onEdit={handleEdit}
          setOpen={setOpenEditDialog}
          todo={finalTodo}
        />
      )}
    </ListItem>
  );
}
