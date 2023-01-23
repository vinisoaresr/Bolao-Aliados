import { useCallback, useEffect, useState } from "react";

const fetcher = async (url, method, payload) => {
  const requestHeaders = new Headers();
  requestHeaders.set("Content-Type", "application/json");

  console.log("fetching data...");
  const res = await fetch(url, {
    body: payload ? JSON.stringify(payload) : undefined,
    headers: requestHeaders,
    method,
  });

  const resobj = await res.json();
  return resobj;
};

export default function useApi() {
  const [apiState, setApiState] = useState("idle");
  const [data, setData] = useState(null);
  const [toCallApi, setApiExecution] = useState(false);

  const execute = () => {
    console.log("executing now");
    setApiExecution(true);
  };

  const fetchApi = useCallback((url, method, payload) => {
    console.log("fetchApi called");

    fetcher(url, method, payload)
      .then((res) => {
        const data = res.data;
        setData({ ...data });
        return;
      })
      .catch((error) => {
        setData(null);
        console.log(error.message);
      })
      .finally(() => {
        setApiState("done");
      });
  }, []);

  // call api
  useEffect(() => {
    if (toCallApi && apiState === "idle") {
      console.log("calling api");
      setApiState("loading");
      fetchApi();
    }
  }, [apiState, fetchApi, toCallApi]);

  return {
    apiState,
    data,
    execute,
  };
}
