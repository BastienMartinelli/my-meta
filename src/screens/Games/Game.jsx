import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/styles";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import CardHeader from "@material-ui/core/CardHeader";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardActionArea from "@material-ui/core/CardActionArea";

import store from "store";
import { getPlayerById } from "store/store";
import PlayerItem from "./PlayerItem";

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: 20
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

/**
 * Hook that return a string with the winners
 * the given players
 * @param {Object[]} players the players
 * @return {string} a string with the winners
 */
const useWinners = players => {
  const [state] = store.useStore();
  const getPlayer = getPlayerById(state);

  const winners =
    !!players &&
    players.filter(player => player.winner).map(player => getPlayer(player.playerId).name);
  return !!winners && !!winners.length ? `🏆 ${winners.join(" / ")}` : "😐 No winner";
};

function Game({ players, date, number }) {
  const [showDetail, setShowDetail] = useState(false);
  const [mountDetail, setMountDetail] = useState(false);

  const classes = useStyles();
  const winners = useWinners(players);

  useEffect(() => {
    // delay the unmount of detail to
    // keep the collapse transition
    if (!showDetail) {
      setTimeout(() => {
        setMountDetail(false);
      }, 200);
    } else {
      setMountDetail(true);
    }
  }, [showDetail]);

  /**
   * Toggle the sho detail
   */
  function toggleDetail() {
    setShowDetail(!showDetail);
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={toggleDetail}>
        <CardHeader
          action={
            <div className={`${classes.expand} ${showDetail ? classes.expandOpen : ""}`}>
              <ExpandMoreIcon />
            </div>
          }
          title={`#${number} - ${winners}`}
          subheader={date}
        />
      </CardActionArea>
      <Collapse in={showDetail}>
        {mountDetail && (
          <List>
            {players.map((player, i) => (
              <PlayerItem playerData={player} key={i} />
            ))}
          </List>
        )}
      </Collapse>
    </Card>
  );
}

export default React.memo(Game);
