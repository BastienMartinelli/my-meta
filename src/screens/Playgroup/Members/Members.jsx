import React from "react";
import { makeStyles } from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";

import AddFab from "components/AddFab";
import AddMember from "./AddMember";
import MemberItem from "./MemberItem";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: 30
  },
  bottomDiv: {
    height: 56
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
          players.map(({ name, avatar, id }) => (
            <MemberItem name={name} key={id} avatar={avatar} />
          ))}
        {!players.length && (
          <ListItem>
            <ListItemText primary="No player found" />
          </ListItem>
        )}
        <div className={classes.bottomDiv} />
      </List>
      <AddFab onClick={toggleShow} />
      <AddMember onClose={toggleShow} open={show} />
    </Container>
  );
}

export default Members;
