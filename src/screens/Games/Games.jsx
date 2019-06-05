import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";

import store from "store";
import AddFab from "components/AddFab";
import AddGame from "./AddGame";
import Game from "./Game";

const useStyles = makeStyles(() => ({
  card: {
    marginTop: 20
  },
  bottomDiv: {
    height: 56
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
        <>
          {games
            .sort((a, b) => b.number - a.number)
            .map((game, index) => (
              <Game key={game.id} {...game} />
            ))}
          <div className={classes.bottomDiv} />
        </>
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
      <AddFab onClick={handleOpen} />
      <AddGame onClose={handleClose} open={show} />
    </Container>
  );
}

export default React.memo(Games);
