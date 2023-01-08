import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { editTodo } from "../lib/service";
import { ToastContext } from "./ToastProvider";

export default function EditDialog({ open, setOpen, onEdit, todo }) {
  const { setToast } = useContext(ToastContext);
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = {
      userId: 1,
      id: todo.id,
      title,
      completed,
    };
    try {
      const data = await editTodo(todo.id, todoData);
      if (data) {
        onEdit(title, completed);
        handleClose();
        setToast({
          severity: "success",
          message: "Edited item successfully!",
        });
      }
    } catch (e) {
      setToast({
        severity: "error",
        message: e.message,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit}
    >
      <DialogTitle>Edit Todo Item</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Todo Title"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          variant="outlined"
        />
        <FormControlLabel
          value={completed}
          control={
            <Checkbox
              checked={completed}
              onClick={(e) => setCompleted(e.target.checked)}
            />
          }
          label="Completed"
          labelPlacement="start"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
