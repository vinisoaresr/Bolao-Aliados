import React from "react";
import { Body } from "./styles";
import EnhancedTable from "../../../components/Transactions";
import useFetch from "../../../hooks/useFetch";
import SpinnerLoading from "../../../components/SpinnerLoading";

function ViewTransaction() {
  const TIME_REFRESH = 300000;
  const user = JSON.parse(localStorage.getItem("user"));
  const { value, loading, error, setNeedRefresh } = useFetch(
    `/transactions/read`,
    "POST",
    user.user
  );

  if (loading) {
    return <SpinnerLoading value={loading} />;
  }

  setTimeout(() => {
    setNeedRefresh(true);
  }, TIME_REFRESH);

  return (
    <Body>
      <EnhancedTable transactions={value}></EnhancedTable>
    </Body>
  );
}

export default ViewTransaction;
