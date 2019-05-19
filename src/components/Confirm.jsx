import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grow from "@material-ui/core/Grow";

function Confirm({ onClose, open, onConfirm, text, title }) {
  function onSubmit() {
    if (onConfirm) onConfirm();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Grow}>
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirm;
