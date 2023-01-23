import React from "react";
import image from "../../assets/unknown.png";
import {
  Card,
  DateText,
  Title,
  Column,
  Row,
  FlagIcon,
  Container,
  Button,
} from "./styles";

const CardMatch = ({ match, callback }) => {
  let date = new Date(match.date);
  date = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Card hasTransaction={match.hasTransaction}>
      <Container>
        <Title>
          {match.homeTeam.name ? match.homeTeam.name : "Não definido"} e{" "}
          {match.awayTeam.name ? match.awayTeam.name : "Não definido"}
        </Title>
        <DateText>{"Horário: " + date}</DateText>
      </Container>
      <Row>
        <Column>
          <Title>
            {match.homeTeam.name ? match.homeTeam.name : "Não definido"}
          </Title>
          {match.homeTeam.crest_path ? (
            <FlagIcon
              src={match.homeTeam.crest_path}
              alt="Image not found"
              width="80"
              height="80"
            />
          ) : (
            <FlagIcon
              src={image}
              alt="Image not found"
              width="80"
              height="80"
            />
          )}
        </Column>

        <Title> X </Title>

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
            <FlagIcon
              src={image}
              alt="Image not found"
              width="80"
              height="80"
            />
          )}
        </Column>
      </Row>
      <Button
        onClick={() => callback(match)}
        hasTransaction={match.hasTransaction}
      >
        {match.hasTransaction ? "Editar aposta" : "Apostar"}
      </Button>
    </Card>
  );
};

export default CardMatch;
