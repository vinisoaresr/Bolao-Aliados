import axios from "axios";

function getDefaultRequestHeaders() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    // TODO verify token / implements refresh token
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
  } else {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }
}

export const axiosApi = () => {
  // const BASE_URL = process.env.REACT_APP_BACKEND_URL; 
  const BASE_URL = process.env.REACT_APP_BACKEND_URL; 

  let config = {
    baseURL: BASE_URL,
    withCredentials: false,
    headers: getDefaultRequestHeaders(),
  };
  return axios.create(config);
};
