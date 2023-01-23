import { useContext } from "react";
import { AuthContext } from "../providers/contexts/auth";

const useAuth = () => {
  const {
    user,
    authenticated,
    signIn,
    signUp,
    signOut,
    RequestAccountRecovery,
    accountRecovery,
  } = useContext(AuthContext);
  return {
    user,
    authenticated,
    signIn,
    signUp,
    signOut,
    RequestAccountRecovery,
    accountRecovery,
  };
};

export default useAuth;
