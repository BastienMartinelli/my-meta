import React from "react";
import MuiAvatar from "@material-ui/core/Avatar";

import avatarList from "./avatarList";

function Avatar({ index, className, onClick, children }) {
  function handleClick() {
    if (onClick) onClick(index);
  }

  return (
    <MuiAvatar src={index ? avatarList[index] : ""} className={className} onClick={handleClick}>
      {children}
    </MuiAvatar>
  );
}

Avatar.list = avatarList;

export default Avatar;
