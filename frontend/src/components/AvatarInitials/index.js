import React from "react";
import { Initials } from "./styles";

function Avatar({ fullName, bgColor, rounded = true }) {
  var colors = [
    "#725AC1",
    "#EB9FEF",
    "#EF233C",
    "#8D99AE",
    "#7692FF",
    "#344966",
    "#0075F2",
    "#EE5622",
    "#FCFF4B",
    "#3423A6",
  ];

  var name = fullName ? fullName.split(" ") : "?";
  bgColor = colors[Math.floor(Math.random() * 10)];

  return (
    <Initials bg={bgColor}>
      {`${
        name.length >= 2
          ? `${name[0].charAt(0).toUpperCase()}${name[1]
              .charAt(0)
              .toUpperCase()}`
          : `${name[0].charAt(0).toUpperCase()}`
      }`}
    </Initials>
  );
}

export default Avatar;
