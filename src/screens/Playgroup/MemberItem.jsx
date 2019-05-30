import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import store from "store";
import Confirm from "components/Confirm";
import avatars from "utils/avatars";

function MemberItem({ name, avatar }) {
  const [, dispatch] = store.useStore();
  const [show, setShow] = React.useState(false);

  function confirmDelete() {
    setShow(true);
  }

  function handleDelete() {
    dispatch({
      type: "@PLAYERS/DELETE",
      payload: name
    });
  }

  function cancelDelete() {
    setShow(false);
  }

  return (
    <>
      <ListItem key={name} button>
        <ListItemAvatar>
          <Avatar src={avatars[avatar]} />
        </ListItemAvatar>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <IconButton onClick={confirmDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Confirm
        open={show}
        title="Member deletion"
        text={`Do you realy want to delete ${name} ?`}
        onConfirm={handleDelete}
        onClose={cancelDelete}
      />
    </>
  );
}

export default MemberItem;
