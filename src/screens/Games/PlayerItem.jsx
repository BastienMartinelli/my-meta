import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import { darken } from "@material-ui/core/styles/colorManipulator";

import store from "store";
import { getDeckById, getPlayerById } from "store/store";
import avatars from "utils/avatars";
import ManaList from "components/ManaList";

const WIN_COLOR = "#FFD951";

const useStyles = makeStyles({
  winner: {
    backgroundColor: WIN_COLOR,
    color: "#FFF",
    "&:hover": {
      backgroundColor: darken(WIN_COLOR, 0.3)
    }
  },
  playerName: {
    marginLeft: 5
  }
});

function PlayerItem({ playerData, onDelete, onWin }) {
  const { playerId, deckId, winner } = playerData;
  const [state] = store.useStore();
  const classes = useStyles();

  /**
   * delete the player from the list
   */
  function handleDelete() {
    if (onDelete) onDelete(playerId);
  }

  /**
   * Toggle the win state of the player
   */
  function handleWin() {
    if (onWin) onWin(playerId);
  }

  /* get the player from the store */
  const deck = getDeckById(state)(deckId);

  /* get the deck from the store */
  const player = getPlayerById(state)(playerId);

  const deckInfo = (
    <>
      <ManaList colors={deck.colors} />
      <Typography component="span" variant="subtitle2" className={classes.playerName}>
        {deck.name}
      </Typography>
    </>
  );

  return (
    <ListItem className={winner ? classes.winner : ""} button={!!onWin} onClick={handleWin}>
      <ListItemAvatar>
        <Avatar src={player.avatar !== undefined && avatars[player.avatar]}>
          {!!player.name && player.name[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={player.name} secondary={deckInfo} />
      <ListItemSecondaryAction>
        {!!onDelete && (
          <IconButton edge="end" aria-label="Delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default PlayerItem;
