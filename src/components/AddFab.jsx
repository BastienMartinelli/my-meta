import React from "react";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles(() => ({
  fab: {
    position: "fixed",
    right: 0,
    bottom: 60,
    margin: 10
  }
}));

function AddFab({ onClick }) {
  const classes = useStyles();

  return (
    <Zoom
      in
      timeout={{
        enter: 200,
        exit: 200
      }}
      unmountOnExit
    >
      <Fab className={classes.fab} color="primary" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Zoom>
  );
}

export default React.memo(AddFab);
