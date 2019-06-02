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
import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";

import store from "store";
import Confirm from "components/Confirm";
import FORMATS from "constants/formats";

const useStyles = makeStyles({
  button: {
    marginTop: 30
  },
  container: {
    marginTop: 10
  },
  divider: {
    marginTop: 20,
    marginBottom: 20
  }
});

function Settings() {
  const [state, dispatch] = store.useStore();
  const [showConfirm, setConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    dispatch({
      type: "@APP/SET_FAVORITE_FORMAT",
      payload: index
    });
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
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
        <List subheader={<ListSubheader>Favorites</ListSubheader>}>
          <ListItem button onClick={handleClickListItem}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Favorite format" secondary={FORMATS[state.favoriteFormat]} />
          </ListItem>
        </List>
        <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {FORMATS.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === state.favoriteFormat}
              onClick={event => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Divider className={classes.divider} />
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
