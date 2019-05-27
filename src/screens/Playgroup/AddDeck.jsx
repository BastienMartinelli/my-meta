import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";

import store from "store";
import ManaPicker from "components/ManaPicker";

import FORMATS from "constants/formats";

function AddDeck({ onClose, open, fullScreen }) {
  const [, dispatch] = store.useStore();
  const [form, setForm] = React.useState({});

  const handleChange = field => e => {
    setForm({
      ...form,
      [field]: e.target.value || ""
    });
  };

  function onSubmit() {
    const { name, format, colors } = form;

    if (!name || !format || !colors || !colors.length) return;

    dispatch({
      type: "@DECKS/ADD",
      payload: { name, colors, format }
    });
    onClose();
    setForm({});
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Grow}
    >
      <DialogTitle>New Deck</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          id="name"
          label="Deck name"
          fullWidth
          variant="outlined"
          value={form.name || ""}
          onChange={handleChange("name")}
        />
        <TextField
          id="format"
          select
          label="Format"
          value={form.format || ""}
          onChange={handleChange("format")}
          margin="normal"
          variant="outlined"
          fullWidth
        >
          {FORMATS.map(format => (
            <MenuItem key={format} value={format}>
              {format}
            </MenuItem>
          ))}
        </TextField>
        <ManaPicker onChange={handleChange("colors")} value={form.colors} />
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
