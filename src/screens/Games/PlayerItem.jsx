import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";

import store from "store";
import avatars from "utils/avatars";

function PlayerItem({ playerData, onDelete, onWin }) {
  const { playerId, deckId } = playerData;
  const [state] = store.useStore();

  /**
   * delete the player from the list
   */
  function handleDelete() {
    onDelete(playerId);
  }

  /**
   * Toggle the win state of the player
   */
  function handleWin() {
    onWin(playerId);
  }

  /* get the player from the store */
  const deck = !!deckId && state.decks.find(d => d.id === deckId);

  /* get the deck from the store */
  const player = !!playerId && state.players.find(p => p.id === playerId);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={player.avatar !== undefined && avatars[player.avatar]}>
          {!!player.name && player.name[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={player.name} secondary={deck.name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton edge="end" aria-label="Winner" onClick={handleWin}>
          {playerData.winner ? <Star /> : <StarBorder />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default PlayerItem;
