import React, { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import mtg from "mtgsdk";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/styles/";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  menu: {
    marginTop: 60,
    width: "100%"
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
      const cards = await mtg.card.where({
        supertypes: "legendary",
        name: value
      });

      // filtering cards duplicates
      const results = [...new Set(cards.map(c => c.name))].map(name =>
        cards.find(c => c.name === name)
      );

      setResults(results);
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
      colors: card.colorIdentity.map(c => c.toLowerCase())
    };

    // notify selection
    onSelect(returnedValue);
  };

  /**
   * handle menu close
   */
  const handleClose = () => {
    console.log("coucou");
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
              {card.name}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

export default withMobileDialog()(AddDeck);
