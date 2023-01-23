import { Route, Routes } from "react-router-dom";

import useAuth from "../hooks/useAuth";

// Public Routes
import Signin from "../pages/public/Signin";
import Signup from "../pages/public/Signup";
import AccountRecovery from "../pages/public/AccountRecovery";
import RequestAccountRecovery from "../pages/public/RequestAccountRecovery";
// Private Routes
import Home from "../pages/private/Home";
import Ranking from "../pages/private/Ranking";
import Profile from "../pages/private/Profile";
import ViewTransactions from "../pages/private/Transactions";

import Header from "../components/Header";
import Body from "../components/Layout/Body";
import { useState } from "react";
import GameRules from "../pages/private/GameRules";

const Private = ({ Item, toggleTheme }) => {
  const { authenticated } = useAuth();
  const [sidebar, setSidebar] = useState(false);

  const controlSideBar = () => {
    setSidebar(!sidebar);
  };

  if (authenticated) {
    return (
      <>
        <Header
          visible={true}
          toggleTheme={toggleTheme}
          sidebar={sidebar}
          setSidebar={controlSideBar}
        />
        <Body sidebar={sidebar}>
          <Item />
        </Body>
      </>
    );
  } else {
    return <Signin />;
  }
};

function RoutesApp({ toggleTheme }) {
  return (
    <Routes>
      <Route exact path="/login" element={<Signin />} />
      <Route exact path="/register" element={<Signup />} />
      <Route
        exact
        path="/account-recovery"
        element={<RequestAccountRecovery />}
      />
      <Route
        exact
        path="/account-recovery/:uuid"
        element={<AccountRecovery />}
      />

      {/* <Route path="/" element={<Signin />} /> */}
      {/* <Route path="*" element={<Signin />} /> */}

      <Route
        exact
        path="*"
        element={<Private Item={Home} toggleTheme={toggleTheme} />}
      />
      <Route
        exact
        path="/"
        element={<Private Item={Home} toggleTheme={toggleTheme} />}
      />
      <Route
        exact
        path="/home"
        element={<Private Item={Home} toggleTheme={toggleTheme} />}
      />
      <Route
        exact
        path="/ranking"
        element={<Private Item={Ranking} toggleTheme={toggleTheme} />}
      />
      <Route
        exact
        path="/transactions"
        element={<Private Item={ViewTransactions} toggleTheme={toggleTheme} />}
      />
      <Route
        exact
        path="/rules"
        element={<Private Item={GameRules} toggleTheme={toggleTheme} />}
      />
      <Route
        exact
        path="/profile/:id"
        element={<Private Item={Profile} toggleTheme={toggleTheme} />}
      />
    </Routes>
  );
}

export default RoutesApp;
