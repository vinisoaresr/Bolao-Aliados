import React, { useState } from "react";
import image from "../../assets/unknown.png";
import useToast from "../../hooks/useToast";
import { axiosApi } from "../../providers/fetchProvider/axios";
import {
  Card,
  DateText,
  Title,
  Column,
  Row,
  FlagIcon,
  Container,
  Button,
  TextField,
  StatusMatch,
} from "./styles";
import HttpStatus from "../../providers/HttpStatus/HttpStatus";

const ModalMatchGuess = ({ match, callback }) => {
  const toast = useToast();
  const [homeTeam, setHomeTeam] = useState(
    match.transaction ? match.transaction.goals_homeTeam : 0
  );
  const [awayTeam, setAwayTeam] = useState(
    match.transaction ? match.transaction.goals_awayTeam : 0
  );

  let date = new Date(match.date);
  date = date.toLocaleString("pt-BR");

  function SubmitForm() {
    if (match.status === "IN_PLAY" || match.status === "PAUSED") {
      toast.notifyUser(
        "error",
        "Partida em andamento",
        "Não é possível fazer palpites em partidas em andamento"
      );
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (match.hasTransaction) {
      axiosApi()
        .post(BASE_URL + "/transactions/update", {
          match: match,
          user: user.user,
          goals_homeTeam: homeTeam,
          goals_awayTeam: awayTeam,
          id: match.transaction.id,
        })
        .then((response) => {
          if (
            response.status === HttpStatus.Accepted &&
            response.data.data != null
          ) {
            callback({
              success: true,
              message: "Registro alterado com sucesso!",
            });
          } else {
            callback({ success: false, message: null });
          }
        })
        .catch((error) => {
          callback({
            success: false,
            message: null,
          });
        });
    } else {
      axiosApi()
        .post(BASE_URL + "/transactions/create", {
          match: match,
          user: user.user,
          goals_homeTeam: homeTeam,
          goals_awayTeam: awayTeam,
        })
        .then((response) => {
          if (
            response.status === HttpStatus.Created &&
            response.data.data != null
          ) {
            callback({
              success: true,
              message: "Registro alterado com sucesso!",
            });
          } else {
            callback({ success: false, message: null });
          }
        })
        .catch((error) => {
          callback({
            success: false,
            message: null,
          });
        });
    }
  }

  function statusMatch(status) {
    switch (status) {
      case "TIMED":
        return "Partida marcada";
      case "SCHEDULED":
        return "Agendado";
      case "IN_PLAY":
        return "Em andamento";
      case "PAUSED":
        return "Pausado";
      case "FINISHED":
        return "Finalizado";
      case "POSTPONED":
        return "Adiado";
      case "SUSPENDED":
        return "Suspenso";
      case "CANCELED":
        return "Cancelado";
      default:
        return "Status não definido";
    }
  }

  // REACT_APP_BACKEND_URL

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  let flagHomeTeam = BASE_URL + match.homeTeam.iconPath;
  let flagAwayTeam = BASE_URL + match.awayTeam.iconPath;

  return (
    <Card>
      <Container>
        <Title>
          {match.homeTeam.name ? match.homeTeam.name : "Não definido"}
          {" e "}
          {match.awayTeam.name ? match.awayTeam.name : "Não definido"}
        </Title>
        <DateText>{"Horário: " + date}</DateText>
        <StatusMatch>{statusMatch(match.status)}</StatusMatch>
      </Container>

      <Row>
        <Column>
          <Title>
            {match.homeTeam.name ? match.homeTeam.name : "Não definido"}
          </Title>
          {match.homeTeam.crest_path ? (
            <FlagIcon
              src={match.homeTeam.crest_path}
              alt="flag not found"
              width="80"
              height="80"
            />
          ) : (
            <FlagIcon src={image} alt="flag not found" width="80" height="80" />
          )}
          <TextField
            type={"number"}
            value={homeTeam}
            onChange={(input) => {
              setHomeTeam(input.target.value);
            }}
          />
        </Column>
        <Column className="title">
          <Title> X </Title>
        </Column>
        <Column>
          <Title>
            {match.awayTeam.name ? match.awayTeam.name : "Não definido"}
          </Title>

          {match.awayTeam.crest_path ? (
            <FlagIcon
              src={match.awayTeam.crest_path}
              alt="flag not found"
              width="80"
              height="80"
            />
          ) : (
            <FlagIcon src={image} alt="flag not found" width="80" height="80" />
          )}
          <TextField
            type={"number"}
            value={awayTeam}
            onChange={(input) => {
              setAwayTeam(input.target.value);
            }}
          />
        </Column>
      </Row>
      <Button onClick={SubmitForm} hasTransaction={match.hasTransaction}>
        {match.hasTransaction ? "Editar Aposta" : "Apostar"}
      </Button>
    </Card>
  );
};

export default ModalMatchGuess;
