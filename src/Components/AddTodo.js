import { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { ToastContext } from "./ToastProvider";

export default function AddTodo({ onAdd }) {
  const [titleInput, setTitleInput] = useState("");
  const { setToast } = useContext(ToastContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAdd(titleInput);
      setTitleInput("");
      setToast({
        severity: "success",
        message: "Added item successfully! 👇",
      });
    } catch (e) {
      setToast({
        severity: "error",
        message: e.message,
      });
    }
  };
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
        "& > :not(style)": {
          margin: "20px 0 10px",
          height: "40px",
          width: "100%",
        },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        value={titleInput}
        id="title"
        variant="outlined"
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Add Todo
      </Button>
    </Box>
  );
}
