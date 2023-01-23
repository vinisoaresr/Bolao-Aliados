import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";

function useFetch(path, method, body) {
  const URL = process.env.REACT_APP_BACKEND_URL + path;
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [needRefresh, setNeedRefresh] = useState(false);

  useEffect(() => {
    setNeedRefresh(false);
    axios({
      url: URL,
      method: method ? method : "GET",
      data: body,
      headers: GetDefaultRequestHeaders(),
    })
      .then(async (response) => {
        setValue(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path, needRefresh]);

  return { loading, value, error, setNeedRefresh };
}

function GetDefaultRequestHeaders() {
  // const { signOut } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));
  if (
    !user ||
    !user.expireDateAccessToken ||
    new Date(user.expireDateRefreshToken) < new Date()
  ) {
    // signOut();
    return;
  }

  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.accessToken}`,
  };
  return header;
}

export default useFetch;
