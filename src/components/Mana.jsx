import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  r: {
    margin: 3,
    color: "#AF1D1D"
  },
  w: {
    margin: 3,
    color: "#FFFFFF"
  },
  u: {
    margin: 3,
    color: "#378BC6"
  },
  g: {
    margin: 3,
    color: "#5BD387"
  },
  b: {
    margin: 3,
    color: "#07190B"
  },
  x: {
    margin: 3,
    color: "#EFEFEF"
  }
});

function Mana({ color }) {
  const classes = useStyles();
  const icon = ` ms ms-${color}`;

  return <i className={classes[color] + icon} />;
}

export default Mana;
