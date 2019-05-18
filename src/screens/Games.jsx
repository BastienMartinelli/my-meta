import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Zoom from "@material-ui/core/Zoom";

import store from "../store";

const useStyles = makeStyles(() => ({
  card: {
    margin: 20
  },
  fab: {
    position: "absolute",
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
    <>
      {games && !!games.length ? (
        games.map(({ date, winner, players, decks }) => (
          <Card className={classes.card} key={date}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {winner}
              </Typography>
              <Typography color="textSecondary">{date}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Detail</Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="h5" component="h2">
          No past matches
        </Typography>
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
      <Dialog onClose={handleClose} open={show}>
        <DialogTitle>Set backup account</DialogTitle>
        <DialogContent>coucou</DialogContent>
      </Dialog>
    </>
  );
}

export default Games;
