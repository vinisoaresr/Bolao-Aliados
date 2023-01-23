import { createContext, useState } from "react";

export const ToastContext = createContext({});

export function ToastProvider({ children }) {
  const [type, setType] = useState("info");
  const [title, setTitle] = useState(" ");
  const [message, setMessage] = useState(" ");
  const [active, setActive] = useState(false);

  const closeToastBar = () => {
    setTitle(" ");
    setMessage(" ");
    setType("info");
    setActive(false);
  };

  const notifyUser = (type = "info", title = " ", message = " ") => {
    setType(type || "info");
    setTitle(title || " ");
    setMessage(message || " ");
    setActive(true);

    // Tempo do toast proporcional ao tamanho das mensagens
    let timeToast = (title.length + message.length) * 100;

    // set inactive in 5 sec
    setTimeout(
      () => {
        setActive(false);
      },
      timeToast > 2000 ? timeToast : 2000 // tempo min = 2s
    );
  };

  return (
    <ToastContext.Provider
      value={{ notifyUser, closeToastBar, type, title, message, active }}
    >
      {children}
    </ToastContext.Provider>
  );
}
