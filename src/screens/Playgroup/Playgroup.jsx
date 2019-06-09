import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import store from "store";

import Members from "./Members";
import Decks from "./Decks";

function Playgroup({ fullScreen }) {
  const [{ players = [], decks = [] }] = store.useStore();
  const [tab, setTab] = React.useState(0);

  function handleTabChange(e, newTab) {
    setTab(newTab);
  }

  return (
    <>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        centered={!fullScreen}
      >
        <Tab label="Players" />
        <Tab label="Decks" />
      </Tabs>
      {tab === 0 && <Members players={players} />}
      {tab === 1 && <Decks decks={decks} />}
    </>
  );
}

export default withMobileDialog()(Playgroup);
