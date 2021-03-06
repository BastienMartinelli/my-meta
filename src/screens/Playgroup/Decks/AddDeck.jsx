import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import MenuItem from "@material-ui/core/MenuItem";

import store from "store";
import ManaPicker from "components/ManaPicker";
import ScreenDialog from "components/ScreenDialog";
import CommanderInput from "./CommanderInput";
import FORMATS from "constants/formats";

function AddDeck({ onClose, open }) {
  const [state, dispatch] = store.useStore();
  const [form, setForm] = useState({});

  // initialize component's state with favorites
  useEffect(() => {
    setForm({
      ...form,
      colors: [],
      format: FORMATS[state.favoriteFormat]
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = field => e => {
    setForm({
      ...form,
      [field]: e.target.value || ""
    });
  };

  function handleCommanderSelect({ name, colors, imageUrl }) {
    setForm({
      ...form,
      colors,
      imageUrl,
      commander: name,
      name: form.name || name
    });
  }

  function onSubmit() {
    const { name, format, colors } = form;

    if (!name || !format) return;

    dispatch({
      type: "@DECKS/ADD",
      payload: { name, colors, format }
    });
    onClose();

    // clean and reinitialize to default format
    setForm({
      format: FORMATS[state.favoriteFormat]
    });
  }

  return (
    <ScreenDialog open={open} onClose={onClose} title="New Deck">
      <DialogContent>
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
        {form.format === "commander" && (
          <CommanderInput
            value={form.commander}
            onChange={handleChange("commander")}
            onSelect={handleCommanderSelect}
          />
        )}
        <TextField
          margin="normal"
          id="name"
          label="Deck name"
          fullWidth
          variant="outlined"
          value={form.name || ""}
          onChange={handleChange("name")}
        />
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
    </ScreenDialog>
  );
}

export default React.memo(AddDeck);
