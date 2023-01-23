import React from "react";
import RoutesApp from "./routes";
import useLocalStorage from "./hooks/useLocalStorage";
import { AuthProvider } from "./providers/contexts/auth";
import GlobalStyle from "./styles/global";
import { ThemeProvider } from "styled-components";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ToastNotification } from "./components/ToastNotification";
import { ToastProvider } from "./providers/contexts/toast";

const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", light);
  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };
  responseInterceptor();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ToastProvider>
            <GlobalStyle />
            <RoutesApp toggleTheme={toggleTheme} />
            <ToastNotification />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;

function responseInterceptor() {

  const baseURL = process.env.REACT_APP_BACKEND_URL;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if (err.response.status == 401 && err.config && !err.config._retry) {
          originalReq._retry = true;
          var user = JSON.parse(localStorage.getItem("user"));
          let res = axios
            .post(`${baseURL}/auth/refresh_token`, {
              refreshToken: user.refreshToken,
            })
            .then((res) => {
              localStorage.setItem("user", JSON.stringify(res.data));
              originalReq.headers[
                "Authorization"
              ] = `Bearer ${res.data.accessToken}`;
              return axios(originalReq);
            });
          resolve(res);
        } else {
          reject(err);
        }
      });
    }
  );
}
