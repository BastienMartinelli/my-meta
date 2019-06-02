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
  const [state] = store.useStore();

  function handleDelete() {
    onDelete(playerData.player);
  }

  function handleWin() {
    onWin(playerData.player);
  }

  const { player, deck } = playerData;

  const fullDeck = deck !== "Other" ? state.decks.find(d => d.id === deck) : { name: deck };
  const fullPlayer =
    player !== "Guest" ? state.players.find(p => p.id === player) : { name: player };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={fullPlayer.avatar !== undefined && avatars[fullPlayer.avatar]}>
          {!!fullPlayer.name && fullPlayer.name[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={fullPlayer.name} secondary={fullDeck.name} />
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
