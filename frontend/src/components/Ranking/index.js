import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../AvatarInitials";
import {
  Container,
  Title,
  Row,
  WrapperName,
  Name,
  Score,
  TextOrder,
  Space,
  WrapperRow,
} from "./styles";

function Ranking({ ranking }) {
  // desativado até que a tela de perfil esteja pronta
  let active = false;
  return (
    <Container>
      <Title>Ranking</Title>
      <WrapperRow>
        {ranking.value.map((position, index) => {
          index += 1;
          return (
            <Row key={index}>
              <Avatar fullName={position.user.name} />
              <TextOrder>
                {index == 1
                  ? "🥇"
                  : index == 2
                  ? "🥈"
                  : index == 3
                  ? "🥉"
                  : index}
              </TextOrder>
              <WrapperName>
                <Name>{position.user.name}</Name>
                <Link to={active ? `/profile/${position.user.id}` : "#"}>
                  Ver perfil
                </Link>
              </WrapperName>
              <Score>{position.score} pts</Score>
            </Row>
          );
        })}
      </WrapperRow>
    </Container>
  );
}

export default Ranking;
