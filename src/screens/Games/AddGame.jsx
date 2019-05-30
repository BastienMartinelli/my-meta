import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Grow from "@material-ui/core/Grow";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";

import store from "store";
import AddPlayer from "./AddPlayer";

const useStyles = makeStyles({
  chip: {
    marginLeft: 3,
    marginTop: 3
  }
});

function AddGame({ onClose, open, fullScreen }) {
  const [, dispatch] = store.useStore();
  const [form, setForm] = React.useState({});
  const classes = useStyles();

  const handleAddPlayer = p => {
    let players = form.players || [];
    players = players.filter(e => e.player !== p.player);
    players = [...players, p];
    setForm({
      ...form,
      players
    });
  };

  function onSubmit() {
    if (form) {
      dispatch({
        type: "@GAMES/ADD",
        payload: form
      });
      onClose();
      setForm({});
    }
  }

  const deletePlayer = p => () => {
    const players = form.players.filter(e => e.player !== p.player);
    setForm({
      ...form,
      players
    });
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Grow}
    >
      <DialogTitle id="form-dialog-title">New Game</DialogTitle>
      <DialogContent>
        <AddPlayer onChange={handleAddPlayer} />
        <Divider />
        <List component="nav" subheader={<ListSubheader>Players</ListSubheader>}>
          {!!form.players &&
            form.players.map((p, i) => (
              <Chip
                key={i}
                className={classes.chip}
                label={`${p.winner ? "🏆 " : ""}${p.player}`}
                onDelete={deletePlayer(p)}
              />
            ))}
        </List>
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

export default withMobileDialog()(AddGame);
