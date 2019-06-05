import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  appBar: {
    position: "relative",
    marginBottom: 5
  },
  flex: {
    flex: 1
  }
});

function ScreenDialog({ onClose, open, fullScreen, children, title }) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "up"
      }}
    >
      {fullScreen ? (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose} aria-label="Close">
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      )}
      {children}
    </Dialog>
  );
}

export default withMobileDialog()(React.memo(ScreenDialog));
