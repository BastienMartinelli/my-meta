import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Container from "@material-ui/core/Container";

import store from "store";
import AddGame from "./AddGame";

const useStyles = makeStyles(() => ({
  card: {
    margin: 20
  },
  fab: {
    position: "fixed",
    right: 0,
    bottom: 60,
    margin: 10
  }
}));

function winner(players) {
  const winners = !!players && players.filter(p => p.winner).map(p => p.player);

  return !!winners && !!winners.length ? `🏆 ${winners.join(" / ")}` : "😐 No winner this time";
}

function Games() {
  const [{ games }] = store.useStore();
  const [show, setShow] = React.useState(false);
  const classes = useStyles();

  function handleClose() {
    setShow(false);
  }

  function handleOpen() {
    setShow(true);
  }

  return (
    <Container maxWidth="md">
      {games && !!games.length ? (
        games.map(({ date, players, decks }) => (
          <Card className={classes.card} key={date}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {winner(players)}
              </Typography>
              <Typography color="textSecondary">{date}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Detail</Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Card className={classes.card}>
          <CardContent>
            <Typography color="textSecondary">No past matches</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={handleOpen}>
              Add a game
            </Button>
          </CardActions>
        </Card>
      )}
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
      <AddGame onClose={handleClose} open={show} />
    </Container>
  );
}

export default Games;
