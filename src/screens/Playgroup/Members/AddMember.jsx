import React from "react";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";

import store from "store";
import ScreenDialog from "components/ScreenDialog";
import avatars from "utils/avatars";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20
  },
  notSelected: {
    margin: 5,
    width: 60,
    height: 60
  },
  selected: {
    width: 60,
    height: 60,
    margin: 5,
    border: "2px solid black",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  }
});

function AddMember({ onClose, open }) {
  const [, dispatch] = store.useStore();
  const [name, setName] = React.useState("");
  const [av, setAv] = React.useState(null);

  const classes = useStyles();

  function handleChange(e) {
    setName(e.target.value || "");
  }

  function onSubmit() {
    if (name) {
      dispatch({
        type: "@PLAYERS/ADD",
        payload: { name, avatar: av }
      });
      onClose();
      setName("");
    }
  }

  const handleSelect = i => () => {
    setAv(i);
  };

  return (
    <ScreenDialog open={open} onClose={onClose} title="New Member">
      <DialogContent>
        <TextField
          margin="normal"
          id="name"
          label="Name"
          fullWidth
          variant="outlined"
          value={name || ""}
          onChange={handleChange}
        />
        <div className={classes.flex}>
          <Avatar
            className={av === null ? classes.selected : classes.notSelected}
            onClick={handleSelect(null)}
          >
            {!!name && name[0]}
          </Avatar>
          {avatars.map((a, i) => (
            <Avatar
              key={i}
              className={av === i ? classes.selected : classes.notSelected}
              onClick={handleSelect(i)}
              src={a}
            />
          ))}
        </div>
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

export default AddMember;