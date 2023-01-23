import { createContext, useEffect, useState } from "react";

import { axiosApi } from "../fetchProvider/axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUser(user);
      setAuthenticated(true);
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      let response = await axiosApi().post("/auth", {
        mail: email,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        setAuthenticated(true);
        return "successful";
      } else {
        signOut();
        return "Verifique o usuário e a senha e tente novamente.";
      }
    } catch (error) {
      signOut();
      return "Verifique o usuário e a senha e tente novamente.";
    }
  };

  const signUp = async (email, password, name) => {
    try {
      let response = await axiosApi().post("/user/create", {
        name: name,
        mail: email,
        password: password,
      });

      if (response.status === 200) {
        return "successful";
      } else {
        return "error";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem("user");
  };

  const RequestAccountRecovery = async (email) => {
    try {
      let response = await axiosApi().post("/account_recovery", {
        mail: email,
      });
      if (response.status === 202) {
        return true;
      } else {
        return { error: response };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const accountRecovery = async (uuid, password) => {
    try {
      let response = await axiosApi().post(`/account_recovery/${uuid}`, {
        password: password,
      });
      if (response.status === 202) {
        return true;
      } else {
        return { error: response };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authenticated,
        signIn,
        signUp,
        signOut,
        RequestAccountRecovery,
        accountRecovery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
