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
import Container from "@material-ui/core/Container";

import AddMember from "./AddMember";

import MemberItem from "./MemberItem";

const useStyles = makeStyles(() => ({
  fab: {
    position: "fixed",
    right: 0,
    bottom: 60,
    margin: 10
  },
  title: {
    marginTop: 30
  }
}));

function Members({ players }) {
  const [show, setShow] = React.useState(false);
  const classes = useStyles();

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <Container maxWidth="md">
      <List
        subheader={
          <ListSubheader className={classes.title} component="div">
            <Badge badgeContent={players.length} color="primary">
              All my playgroup members
            </Badge>
          </ListSubheader>
        }
      >
        <Divider />
        {players &&
          players.map(({ name, avatar }) => <MemberItem name={name} key={name} avatar={avatar} />)}
        {!players.length && (
          <ListItem>
            <ListItemText primary="No player found" />
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
        <Fab className={classes.fab} color="primary" onClick={toggleShow}>
          <AddIcon />
        </Fab>
      </Zoom>
      <AddMember onClose={toggleShow} open={show} />
    </Container>
  );
}

export default Members;
