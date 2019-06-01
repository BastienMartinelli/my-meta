import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles/";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import { getCommanderByName } from "store/actions";
import ManaList from "components/ManaList";

const useStyles = makeStyles({
  menu: {
    marginTop: 60,
    width: "100%"
  },
  mana: {
    marginRight: 10
  }
});

function AddDeck({ onChange, onSelect, value }) {
  const [results, setResults] = useState(null);
  const [selection, setSelection] = useState("");
  const [loading, setLoading] = useState(false);
  const anchorRef = useRef(null);
  const classes = useStyles();

  async function searchCommander() {
    if (!value || value.length < 3 || value === selection) return;

    try {
      setLoading(true);
      // querying mtg web service
      setResults(await getCommanderByName(value));
    } catch (err) {
      console.log(err);
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Generate a click event handler for the given commander
   * menu item
   * @param {*} name the name of the commander
   * @return {func} the handler
   */
  const handleCommanderClick = card => () => {
    // reset results list
    setSelection(card.name);
    setResults(null);

    const returnedValue = {
      name: card.name,
      imageUrl: card.imageUrl,
      colors: card.colorIdentity
    };

    // notify selection
    onSelect(returnedValue);
  };

  /**
   * handle menu close
   */
  const handleClose = () => {
    setResults(null);
  };

  return (
    <>
      <TextField
        ref={anchorRef}
        margin="normal"
        id="name"
        label="Commander"
        fullWidth
        variant="outlined"
        value={value || ""}
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="Toggle password visibility"
                onClick={searchCommander}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {loading && <LinearProgress color="secondary" />}
      <Menu
        className={classes.menu}
        anchorEl={anchorRef.current}
        open={!!results && !!results.length}
        onClose={handleClose}
      >
        {results &&
          results.map(card => (
            <MenuItem key={card.name} onClick={handleCommanderClick(card)}>
              <ManaList colors={card.colorIdentity} className={classes.mana} />
              <span>{card.name}</span>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

export default withMobileDialog()(AddDeck);
