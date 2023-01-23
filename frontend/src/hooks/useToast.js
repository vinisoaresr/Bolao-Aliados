import { useContext } from "react";
import { ToastContext } from "../providers/contexts/toast";

const useToast = () => {
  const { notifyUser } = useContext(ToastContext);
  return { notifyUser };
};

export default useToast;
