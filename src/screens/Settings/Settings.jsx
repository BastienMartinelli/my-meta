import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import store from "store";
import Confirm from "components/Confirm";

const useStyles = makeStyles({
  button: {
    marginTop: 30
  }
});

function Settings() {
  const [, dispatch] = store.useStore();
  const [showConfirm, setConfirm] = useState(false);
  const classes = useStyles();

  function toggleConfirm() {
    setConfirm(!showConfirm);
  }

  function reinitApp() {
    dispatch({
      type: "@STORE/INIT"
    });
    toggleConfirm();
  }

  return (
    <>
      <Confirm
        open={showConfirm}
        title="Application Reinitialization"
        text={`Do you realy want to reinitialize all the data of the application ?`}
        onConfirm={reinitApp}
        onClose={toggleConfirm}
        maxWidth="sm"
      />
      <Container maxWidth="md">
        <Button fullWidth color="primary" variant="contained" className={classes.button}>
          Copy application data to clipboard
        </Button>
        <Button fullWidth color="primary" variant="contained" className={classes.button}>
          Import application data
        </Button>
        <Button
          onClick={toggleConfirm}
          fullWidth
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Reinitialize the application
        </Button>
      </Container>
    </>
  );
}
export default Settings;
