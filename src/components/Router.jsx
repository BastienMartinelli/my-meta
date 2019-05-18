import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0
  }
});

function Router({ defaultRoute, routes }) {
  const [route, setRoute] = useState(defaultRoute.value);
  const classes = useStyles();

  function handleChange(event, newRoute) {
    setRoute(newRoute);
  }

  const { Screen } = routes[route];

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {routes[route].long || routes[route].label}
          </Typography>
        </Toolbar>
      </AppBar>
      <Screen />
      <BottomNavigation
        showLabels
        className={classes.stickToBottom}
        value={route}
        onChange={handleChange}
      >
        {Object.keys(routes).map(k => (
          <BottomNavigationAction
            key={routes[k].value}
            label={routes[k].label}
            value={routes[k].value}
            icon={routes[k].icon}
          />
        ))}
      </BottomNavigation>
    </div>
  );
}

export default Router;
