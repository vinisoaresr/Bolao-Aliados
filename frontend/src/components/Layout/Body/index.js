import React from "react";
import { Wrapper } from "./styles";

function Body({ children, sidebar }) {
  return <Wrapper sidebar={sidebar}>{children}</Wrapper>;
}

export default Body;
