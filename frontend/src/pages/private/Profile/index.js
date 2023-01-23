import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../../../components/AvatarInitials";
import SpinnerLoading from "../../../components/SpinnerLoading";
import TextField from "../../../components/TextField";
import useFetch from "../../../hooks/useFetch";

import { Container, Title } from "./styles";

export function Profile() {
  let { id } = useParams();

  const { value, loading, error } = useFetch(`/user/${id}`);

  if (loading) {
    return <SpinnerLoading value={loading} />;
  }

  return (
    <Container>
      <Title>Perfil</Title>
      {value.id}
      {value.name}
      {value.mail}
      {value.transactions.map((transaction) => (
        <>
          {transaction.id}
          {transaction.goals_homeTeam}
          {transaction.goals_awayTeam}
          {transaction.calculed_score}
        </>
      ))}
      {value.score}
      <Avatar fullName={"Vinicius Soares"} bgColor={"black"}></Avatar>
      <TextField></TextField>
    </Container>
  );
}

export default Profile;

// transaction
// calculed_score: 0
// created: "2022-09-06T02:20:04.470+00:00"
// goals_awayTeam: 0
// goals_homeTeam: 0
// id: 7544
// match:

// updated: null
