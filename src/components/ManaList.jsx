import React from "react";

import Mana from "./Mana";

function ManaList({ colors, className }) {
  return (
    <span className={className}>
      {colors.includes("w") && <Mana color="w" />}
      {colors.includes("u") && <Mana color="u" />}
      {colors.includes("b") && <Mana color="b" />}
      {colors.includes("r") && <Mana color="r" />}
      {colors.includes("g") && <Mana color="g" />}
      {colors.includes("x") && <Mana color="x" />}
    </span>
  );
}

export default ManaList;
