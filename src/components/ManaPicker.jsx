import React from "react";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/styles";

import Mana from "./Mana";

const COLORS = ["r", "b", "g", "u", "w", "x"];

const useStyles = makeStyles({
  checked: {},
  flex: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10
  },
  notSelected: {
    margin: 5,
    width: 60,
    height: 60
  },
  selected: {
    width: 60,
    height: 60,
    margin: 5,
    border: "3px solid rgba(0,0,0,0.8)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  }
});

function ManaPicker({ value = [], onChange }) {
  const classes = useStyles();

  const handleChange = c => () => {
    const result = value.includes(c) ? value.filter(e => c !== e) : [...value, c];
    if (c && onChange)
      onChange({
        target: {
          value: result
        }
      });
  };

  return (
    <div className={classes.flex}>
      {COLORS.map(c => {
        const selected = value.includes(c) ? classes.selected : classes.notSelected;

        return (
          <Avatar key={c} className={selected} onClick={handleChange(c)}>
            <Mana color={c} />
          </Avatar>
        );
      })}
    </div>
  );
}

export default ManaPicker;
