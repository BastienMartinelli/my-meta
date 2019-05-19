import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Restore from "@material-ui/icons/Restore";
import TrendingUp from "@material-ui/icons/TrendingUp";
import People from "@material-ui/icons/People";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import Router from "./components/Router";
import Store, { Persister } from "./store";
import Games from "./screens/Games";
import Playgroup from "./screens/Playgroup";
import theme from "./utils/theme";
import Welcome from "./screens/Welcome";

const routes = {
  games: {
    value: "games",
    label: "Games",
    long: "Games History",
    Screen: Games,
    icon: <Restore />
  },
  playgroup: {
    value: "playgroup",
    label: "Playgroup",
    long: "My Playgroup",
    Screen: Playgroup,
    icon: <People />
  },
  stats: {
    value: "stats",
    label: "Stats",
    long: "Game Statistics",
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
          <Welcome />
        </Persister>
      </Store.Provider>
    </MuiThemeProvider>
  );
}

export default App;
