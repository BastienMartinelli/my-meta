import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import DeleteIcon from "@material-ui/icons/Delete";

import store from "store";
import Confirm from "components/Confirm";

const useStyles = makeStyles({
  button: {
    marginTop: 30
  },
  container: {
    marginTop: 10
  }
});

function Settings() {
  const [state, dispatch] = store.useStore();
  const [showConfirm, setConfirm] = useState(false);
  const classes = useStyles();

  function toggleConfirm() {
    setConfirm(!showConfirm);
  }

  function reinitApp() {
    dispatch({
      type: "@APP/INIT"
    });
    toggleConfirm();
  }

  function toggleDark() {
    dispatch({
      type: "@APP/TOGGLE_DARK"
    });
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
      <Container maxWidth="md" className={classes.container}>
        <List subheader={<ListSubheader>Theme</ListSubheader>}>
          <ListItem button onClick={toggleDark}>
            <ListItemIcon>
              <InvertColorsIcon />
            </ListItemIcon>
            <ListItemText primary="Dark Theme" />
            <ListItemSecondaryAction>
              <Switch value="checkedD" onChange={toggleDark} checked={state.dark} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List subheader={<ListSubheader>App data</ListSubheader>}>
          <ListItem button onClick={toggleConfirm}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Reinitialize the application" />
            <ListItemSecondaryAction />
          </ListItem>
        </List>
      </Container>
    </>
  );
}
export default Settings;
