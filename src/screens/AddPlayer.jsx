import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/styles/";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import store from "../store";

const useStyles = makeStyles({
  divider: {
    margin: 5,
    marginBottom: 10
  },
  formControl: {
    marginTop: 5
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

  function handleCheck(e) {
    if (e) {
      setValue({
        ...value,
        winner: e.target.checked
      });
    }
  }

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel htmlFor="player">Player</InputLabel>
        <Select
          value={value.player || ""}
          onChange={handleChange("player")}
          input={<OutlinedInput name="player" id="player" labelWidth={50} />}
          fullWidth
        >
          <MenuItem value="">
            <em />
          </MenuItem>
          <MenuItem value="Guest">
            <em>Guest</em>
          </MenuItem>
          {!!state.players &&
            state.players.map(m => (
              <MenuItem key={m.name} value={m.name}>
                {m.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div className={classes.divider} />
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel htmlFor="deck">Deck</InputLabel>
        <Select
          value={value.deck || ""}
          onChange={handleChange("deck")}
          input={<OutlinedInput name="deck" id="deck" labelWidth={50} />}
          fullWidth
        >
          <MenuItem value="">
            <em />
          </MenuItem>
          <MenuItem value="Other">
            <em>Other</em>
          </MenuItem>
          {!!state.decks &&
            state.decks.map(d => (
              <MenuItem key={d.name} value={d.name}>
                {d.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div className={classes.divider}>
        <FormControlLabel
          control={<Switch checked={value.winner || false} onChange={handleCheck} value="winner" />}
          label="Winner"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add player
        </Button>
      </div>
    </>
  );
}

export default AddPlayer;
