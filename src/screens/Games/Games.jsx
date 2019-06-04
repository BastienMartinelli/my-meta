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
import Game from "./Game";

const useStyles = makeStyles(() => ({
  card: {
    marginTop: 20
  },
  fab: {
    position: "fixed",
    right: 0,
    bottom: 60,
    margin: 10
  }
}));

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
        games
          .sort((a, b) => b.number - a.number)
          .map((game, index) => <Game key={game.id} {...game} />)
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

export default React.memo(Games);
