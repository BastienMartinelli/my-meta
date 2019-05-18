import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import store from "../store";

function AddGame({ onClose, open, fullScreen }) {
  const [, dispatch] = store.useStore();
  const [form, setForm] = React.useState("");

  const handleChange = field => e => {
    if (e.target.value) {
      setForm({
        ...form,
        [field]: e.target.value
      });
    }
  };

  function onSubmit() {
    if (form) {
      dispatch({
        type: "@GAMES/ADD",
        payload: form
      });
      onClose();
      setForm({});
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Game</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          label="Winner"
          fullWidth
          variant="outlined"
          value={form.winner || ""}
          onChange={handleChange("winner")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withMobileDialog()(AddGame);
