import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

const SidebarItem = ({ Icon, Text, Route, callback, isActive = true }) => {
  return (
    <Container isActive={isActive}>
      <Link onClick={isActive ? callback : null} to={isActive ? Route : "#"}>
        <Icon />
        {Text}
      </Link>
    </Container>
  );
};

export default SidebarItem;
