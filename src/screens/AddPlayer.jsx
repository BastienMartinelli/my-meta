import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/styles/";

const useStyles = makeStyles({
  divider: {
    margin: 5,
    marginBottom: 10
  }
});

function AddPlayer({ onChange }) {
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
      <TextField
        margin="normal"
        label="Player"
        fullWidth
        variant="outlined"
        value={value.player || ""}
        onChange={handleChange("player")}
      />
      <TextField
        margin="normal"
        label="Deck"
        fullWidth
        variant="outlined"
        value={value.deck || ""}
        onChange={handleChange("deck")}
      />
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
