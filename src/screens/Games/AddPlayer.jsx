import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles/";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import store from "store";

const useStyles = makeStyles({
  divider: {
    margin: 5,
    marginBottom: 10
  },
  formControl: {
    marginTop: 5
  },
  button: {
    marginTop: 12
  }
});

function AddPlayer({ onChange }) {
  const [state] = store.useStore();
  const [value, setValue] = useState({});
  const classes = useStyles();

  const handleChange = field => e => {
    if (e && e.target.value) {
      setValue({
        ...value,
        [field]: e.target.value
      });
    }
  };

  function handleSubmit() {
    if (onChange && value && value.playerId && value.deckId) return onChange(value);
    setValue({});
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <TextField
          select
          label="Player name"
          className={classes.textField}
          value={value.playerId || ""}
          onChange={handleChange("playerId")}
          margin="normal"
          variant="outlined"
          fullWidth
        >
          <MenuItem value="">
            <em />
          </MenuItem>
          {!!state.players &&
            state.players.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={5}>
        <TextField
          select
          label="Deck name"
          className={classes.textField}
          value={value.deckId || ""}
          onChange={handleChange("deckId")}
          margin="normal"
          variant="outlined"
          fullWidth
        >
          <MenuItem value="">
            <em />
          </MenuItem>
          {!!state.decks &&
            state.decks.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <IconButton className={classes.button} onClick={handleSubmit} color="primary">
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default AddPlayer;
