import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Grow from "@material-ui/core/Grow";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import store from "store";
import AddPlayer from "./AddPlayer";
import PlayerItem from "./PlayerItem";

function AddGame({ onClose, open, fullScreen }) {
  const [, dispatch] = store.useStore();
  const [form, setForm] = React.useState({});

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

  function deletePlayer(player) {
    const players = form.players.filter(e => e.player !== player);
    setForm({
      ...form,
      players
    });
  }

  function toggleWin(playerId) {
    const player = form.players.find(p => p.player === playerId);
    const players = form.players.filter(e => e.player !== playerId);

    player.winner = !player.winner;

    setForm({
      ...form,
      player: [...players, player]
    });
  }

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
        {form.players && form.players.length ? (
          <List subheader={<ListSubheader>Players</ListSubheader>}>
            {form.players.map((player, i) => (
              <PlayerItem playerData={player} key={i} onDelete={deletePlayer} onWin={toggleWin} />
            ))}
          </List>
        ) : null}
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
