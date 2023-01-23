import React, { useContext } from "react";
import Switch from "react-switch";
import { Container, Content, Text, Toggle } from "./styles";
import {
  IoIosHome,
  IoIosList,
  IoIosPodium,
  IoIosPerson,
  IoIosExit,
  IoIosArrowBack,
  IoIosPaper,
} from "react-icons/io";

import SidebarItem from "../SidebarItem";
import useAuth from "../../../../hooks/useAuth";
import { ThemeContext } from "styled-components";

const Sidebar = ({ active, toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);
  const { signOut, user } = useAuth();
  let id;
  if (user) {
    id = user.user.id;
  }

  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active}>
      <IoIosArrowBack onClick={closeSidebar} />
      <Content>
        <SidebarItem
          Icon={IoIosHome}
          Text="Início"
          Route={"/home"}
          callback={closeSidebar}
        />
        <SidebarItem
          Icon={IoIosList}
          Text="Palpites"
          Route={"/transactions"}
          callback={closeSidebar}
        />
        <SidebarItem
          Icon={IoIosPaper}
          Text="Regras"
          Route={"/rules"}
          callback={closeSidebar}
        />
        <SidebarItem
          Icon={IoIosPodium}
          Text="Classificação"
          Route={"/ranking"}
          callback={closeSidebar}
        />
        <SidebarItem
          Icon={IoIosPerson}
          Text="Perfil"
          Route={`/profile/${id}`}
          callback={closeSidebar}
          isActive={false}
        />
        <SidebarItem
          Icon={IoIosExit}
          Text="Sair"
          Route={"/"}
          callback={() => {
            closeSidebar();
            signOut();
          }}
        />
      </Content>
      <Toggle>
        <Text>Dark Mode</Text>
        <Switch
          onChange={toggleTheme}
          checked={title === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          offColor={colors.primary}
          onColor={colors.secundary}
          draggable={true}
        />
      </Toggle>
    </Container>
  );
};

export default Sidebar;
