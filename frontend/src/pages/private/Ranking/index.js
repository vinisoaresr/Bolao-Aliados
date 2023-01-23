import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../components/AvatarInitials";
import Ranking from "../../../components/Ranking";
import SpinnerLoading from "../../../components/SpinnerLoading";
import useFetch from "../../../hooks/useFetch";
import useToast from "../../../hooks/useToast";
import { Container } from "./styles";

function LeaderBoarding() {
  const ranking = useFetch(`/ranking/list`);
  const { notifyUser } = useToast();

  if (ranking.loading) {
    return <SpinnerLoading value={ranking.loading} />;
  }

  if (ranking.error) {
    notifyUser(
      "error",
      "Ocorreu um erro ao carregar ranking...",
      "Tente novamente mais tarde!"
    );
  }

  return (
    <Container>
      <Ranking ranking={ranking} />
    </Container>
  );
}

export default LeaderBoarding;
