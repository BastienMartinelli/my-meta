import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Grow from "@material-ui/core/Grow";

import store from "../store";
import ManaPicker from "../components/ManaPicker";

function AddDeck({ onClose, open, fullScreen }) {
  const [, dispatch] = store.useStore();
  const [commander, setCommander] = React.useState("");
  const [colors, setColors] = React.useState([]);

  function handleChange(e) {
    setCommander(e.target.value || "");
  }

  function onSubmit() {
    if (commander) {
      dispatch({
        type: "@DECKS/ADD",
        payload: { commander, colors }
      });
      onClose();
      setCommander("");
      setColors([]);
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Grow}
    >
      <DialogTitle id="form-dialog-title">New Deck</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          id="commander"
          label="Commander"
          fullWidth
          variant="outlined"
          value={commander || ""}
          onChange={handleChange}
        />
        <ManaPicker onChange={setColors} value={colors} />
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

export default withMobileDialog()(AddDeck);
