import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";

import store from "../store";
import Confirm from "../components/Confirm";
import Mana from "../components/Mana";

const withStyles = makeStyles({
  name: {
    marginRight: 6
  }
});

function DeckItem({ commander, colors = [] }) {
  const [, dispatch] = store.useStore();
  const [show, setShow] = React.useState(false);
  const classes = withStyles();

  function confirmDelete() {
    setShow(true);
  }

  function handleDelete() {
    dispatch({
      type: "@DECKS/DELETE",
      payload: commander
    });
  }

  function cancelDelete() {
    setShow(false);
  }

  const text = (
    <span>
      {colors.map(c => (
        <Mana color={c} />
      ))}
    </span>
  );

  return (
    <>
      <ListItem button>
        <ListItemText
          primary={<span className={classes.name}>{commander}</span>}
          secondary={text}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={confirmDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Confirm
        open={show}
        title="Deck deletion"
        text={`Do you realy want to delete ${commander} ?`}
        onConfirm={handleDelete}
        onClose={cancelDelete}
      />
    </>
  );
}

export default DeckItem;
