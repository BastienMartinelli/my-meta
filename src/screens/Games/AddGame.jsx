import React from "react";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import store from "store";
import ScreenDialog from "components/ScreenDialog";
import AddPlayer from "./AddPlayer";
import PlayerItem from "./PlayerItem";

function AddGame({ onClose, open }) {
  const [, dispatch] = store.useStore();
  const [form, setForm] = React.useState({});

  /**
   * On submit new game
   */
  function onSubmit() {
    if (form && form.players && form.players.length) {
      dispatch({
        type: "@GAMES/ADD",
        payload: form
      });
      onClose();
      setForm({});
    }
  }

  /**
   * Add the given player to the list
   * @param {Object} player the player to add
   */
  function handleAddPlayer(player) {
    // get the list of players
    let players = form.players || [];
    players = players.filter(e => e.playerId !== player.playerId);
    players = [player, ...players];
    setForm({
      ...form,
      players
    });
  }

  /**
   * Remove the given player from the list
   * @param {*} player the player to delete
   */
  function deletePlayer(player) {
    const players = form.players.filter(e => e.playerId !== player);
    setForm({
      ...form,
      players
    });
  }

  /**
   * Change the win state of the given player
   * @param {string} playerId the player id
   */
  function toggleWin(playerId) {
    // get the player by is id
    const player = form.players.find(p => p.playerId === playerId);
    // get the other players
    const otherPlayers = form.players.filter(e => e.playerId !== playerId);

    player.winner = !player.winner;

    setForm({
      ...form,
      players: [player, ...otherPlayers]
    });
  }

  return (
    <ScreenDialog open={open} onClose={onClose} title="New Game">
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
    </ScreenDialog>
  );
}

export default React.memo(AddGame);
