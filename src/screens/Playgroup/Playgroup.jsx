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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import store from "store";
import AddMember from "./AddMember";
import AddDeck from "./AddDeck";
import DeckItem from "./DeckItem";

import MemberItem from "./MemberItem";

const useStyles = makeStyles(() => ({
  card: {
    margin: 20
  },
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

function Playgroup() {
  const [{ players = [], decks = [] }] = store.useStore();
  const [show, setShow] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();

  const handleShow = type => () => {
    setShow(type);
  };

  function handleTabChange(e, newTab) {
    setTab(newTab);
  }

  return (
    <>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Players" />
        <Tab label="Decks" />
      </Tabs>
      {tab === 0 && (
        <>
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
              players.map(({ name, avatar }) => (
                <MemberItem name={name} key={name} avatar={avatar} />
              ))}
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
            <Fab className={classes.fab} color="primary" onClick={handleShow("player")}>
              <AddIcon />
            </Fab>
          </Zoom>
          <AddMember onClose={handleShow()} open={show === "player"} />
        </>
      )}
      {tab === 1 && (
        <>
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
            {!decks.length && (
              <ListItem>
                <ListItemText primary="No deck found" />
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
            <Fab className={classes.fab} color="primary" onClick={handleShow("deck")}>
              <AddIcon />
            </Fab>
          </Zoom>
          <AddDeck onClose={handleShow()} open={show === "deck"} />
        </>
      )}
    </>
  );
}

export default Playgroup;
