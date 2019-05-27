import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import RestoreIcon from "@material-ui/icons/Restore";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import Store from "store";
import Games from "screens/Games/Games";
import Playgroup from "screens/Playgroup";
import Welcome from "screens/Welcome";
import Stats from "screens/Stats";
import Settings from "screens/Settings";
import Router from "components/Router";
import Persister from "components/Persister";
import theme from "utils/theme";

const routes = {
  games: {
    value: "games",
    label: "Games",
    long: "Games History",
    Screen: Games,
    icon: <RestoreIcon />
  },
  playgroup: {
    value: "playgroup",
    label: "Playgroup",
    long: "My Playgroup",
    Screen: Playgroup,
    icon: <PeopleIcon />
  },
  stats: {
    value: "stats",
    label: "Stats",
    long: "Game Statistics",
    Screen: Stats,
    icon: <TrendingUpIcon />
  },
  settings: {
    value: "settings",
    label: "Settings",
    long: "Application settings",
    Screen: Settings,
    icon: <SettingsIcon />
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
