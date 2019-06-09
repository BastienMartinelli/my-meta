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
import AddDeck from "./AddDeck";
import DeckItem from "./DeckItem";

const useStyles = makeStyles(() => ({
  card: {
    margin: 20
  },
  title: {
    marginTop: 30
  },
  bottomDiv: {
    height: 56
  }
}));

function Decks({ decks }) {
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
            <Badge badgeContent={decks.length} color="primary">
              All my playgroup decks
            </Badge>
          </ListSubheader>
        }
      >
        <Divider />
        {!!decks &&
          decks.map(({ name, colors }) => <DeckItem name={name} key={name} colors={colors} />)}
        <div className={classes.bottomDiv} />
        {!decks.length && (
          <ListItem>
            <ListItemText primary="No deck found" />
          </ListItem>
        )}
      </List>
      <AddFab onClick={toggleShow} />
      <AddDeck onClose={toggleShow} open={show} />
    </Container>
  );
}

export default React.memo(Decks);
