import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Restore from "@material-ui/icons/Restore";
import TrendingUp from "@material-ui/icons/TrendingUp";
import People from "@material-ui/icons/People";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import Router from "./components/Router";
import Store, { Persister } from "./store";
import Games from "./screens/Games";
import Members from "./screens/Members";
import theme from "./utils/theme";

const routes = {
  games: {
    value: "games",
    label: "Games",
    long: "Games history",
    Screen: Games,
    icon: <Restore />
  },
  members: {
    value: "members",
    label: "Members",
    long: "My team members",
    Screen: Members,
    icon: <People />
  },
  stats: {
    value: "stats",
    label: "Stats",
    long: "Game statistics",
    Screen: () => <div>Stats</div>,
    icon: <TrendingUp />
  }
};

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Store.Provider>
        <Persister>
          <CssBaseline />
          <Router routes={routes} defaultRoute={routes.games} />
        </Persister>
      </Store.Provider>
    </MuiThemeProvider>
  );
}

export default App;
