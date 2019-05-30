import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  mana: {
    margin: 1,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
  }
});

function Mana({ color }) {
  const classes = useStyles();
  const icon = ` ms ms-${color} ms-cost`;

  return <i className={classes.mana + icon} />;
}

export default Mana;
