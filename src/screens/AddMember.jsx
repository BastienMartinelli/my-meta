import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import store from "../store";
import avatars from "../utils/avatars";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center"
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

function AddMember({ onClose, open, fullScreen }) {
  const [, dispatch] = store.useStore();
  const [name, setName] = React.useState("");
  const [av, setAv] = React.useState(0);

  const classes = useStyles();

  function handleChange(e) {
    setName(e.target.value || "");
  }

  function onSubmit() {
    if (name) {
      dispatch({
        type: "@MEMBERS/ADD",
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
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New member</DialogTitle>
      <DialogContent>
        <DialogContentText>Name of that fucker ?</DialogContentText>
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
    </Dialog>
  );
}

export default withMobileDialog()(AddMember);
