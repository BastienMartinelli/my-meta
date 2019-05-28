import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import store from "store";

function Welcome() {
  const [{ notFirstTime }, dispatch] = store.useStore();
  const [init, setInit] = useState(false);

  // delaying modal opening to show the transition
  useEffect(() => {
    setTimeout(() => {
      setInit(true);
    }, 1000);
  }, []);

  function handleConfirm() {
    dispatch({
      type: "@APP/FIRST_TIME"
    });
  }

  return (
    <Dialog fullWidth maxWidth="sm" open={init && !notFirstTime} TransitionComponent={Grow}>
      <DialogTitle id="form-dialog-title">Welcome !</DialogTitle>
      <DialogContent>
        <DialogContentText>Where to start from here ?</DialogContentText>
        <List dense>
          <ListItem>
            <ListItemText primary="🌟 Add some players" />
          </ListItem>
          <ListItem>
            <ListItemText primary="🌟 Add some decks" />
          </ListItem>
          <ListItem>
            <ListItemText primary="🌟 Play and record the results !" />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          I understand
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Welcome;
