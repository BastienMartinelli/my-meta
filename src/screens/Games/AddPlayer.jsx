import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles/";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";

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
    if (onChange && value && value.player && value.deck) return onChange(value);
    setValue({});
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={5}>
        <TextField
          select
          label="Player name"
          className={classes.textField}
          value={value.player || ""}
          onChange={handleChange("player")}
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
          value={value.deck || ""}
          onChange={handleChange("deck")}
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
        <IconButton className={classes.button} onClick={handleSubmit}>
          <AddIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default AddPlayer;
