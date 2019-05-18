import React from "react";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import Zoom from "@material-ui/core/Zoom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import store from "../store";
import AddMember from "./AddMember";
import MemberItem from "./MemberItem";

const useStyles = makeStyles(() => ({
  card: {
    margin: 20
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 60,
    margin: 10
  },
  title: {
    marginTop: 30
  }
}));

function Mambers() {
  const [{ members }] = store.useStore();
  const [show, setShow] = React.useState(false);
  const classes = useStyles();

  function handleClose() {
    setShow(false);
  }

  function handleOpen() {
    setShow(true);
  }

  return (
    <>
      <List
        subheader={
          <ListSubheader className={classes.title} component="div">
            <Badge badgeContent={members.length} color="primary">
              All my team members
            </Badge>
          </ListSubheader>
        }
      >
        <Divider />
        {members &&
          members.map(({ name, avatar }) => <MemberItem name={name} key={name} avatar={avatar} />)}
        {!members.length && (
          <ListItem>
            <ListItemText primary="No member found" />
          </ListItem>
        )}
      </List>
      <Zoom
        in
        timeout={{
          enter: 200,
          exit: 200
        }}
        unmountOnExit
      >
        <Fab className={classes.fab} color="primary" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Zoom>
      <AddMember onClose={handleClose} open={show} />
    </>
  );
}

export default Mambers;
