import React from "react";

import { Container } from "./styles";
import { FaBars } from "react-icons/fa";
import Sidebar from "./DropDownMenu/Sidebar";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ visible, toggleTheme, sidebar, setSidebar }) => {
  if (visible) {
    return (
      <Container>
        <FaBars onClick={setSidebar} />
        {sidebar && <Sidebar active={setSidebar} toggleTheme={toggleTheme} />}
        <Link to={"/home"}>
          <Logo />
        </Link>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

export default Header;
