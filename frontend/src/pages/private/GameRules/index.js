import React from "react";
import {
  Container,
  Title,
  Text,
  Subtitle,
  TextScore,
  WrapperRule,
  WrapperExample,
  Wrapper,
  WrapperTextScore,
} from "./styles";

function GameRules() {
  return (
    <Container>
      <Title>Regras do Jogo</Title>
      <Wrapper>
        <WrapperRule>
          <Subtitle>Acerto Perfeito 😎</Subtitle>
          <Text>
            Palpite no qual o placar apostado acerte o time vencedor, o time
            perdedor e o número de gols dos dois times, <b>OU</b>, Em caso de
            empate, acertar o número de gols dos times.
          </Text>
          <WrapperExample>
            <Text>
              <b>Exemplo:</b> Aliados 3 x 0 Concorrência. Palpite Realizado:
              Aliados 3 x 0 Concorrência.
            </Text>
          </WrapperExample>
          <WrapperTextScore>
            <TextScore>10 pontos</TextScore>
          </WrapperTextScore>
        </WrapperRule>
        <WrapperRule>
          <Subtitle>Acerto Quase Perfeito 😌</Subtitle>
          <Text>
            Palpite no qual o placar apostado acerte o time vencedor e o número
            de gols do vencedor.
          </Text>
          <WrapperExample>
            <Text>
              <b>Exemplo:</b> Jogo 3 x 0. Palpite: 3 x 1
            </Text>
          </WrapperExample>
          <WrapperTextScore>
            <TextScore>7 pontos</TextScore>
          </WrapperTextScore>
        </WrapperRule>
        <WrapperRule>
          <Subtitle>Acerto Normal 🥺</Subtitle>
          <Text>
            Palpite no qual o placar apostado é compatível apenas com o time que
            ganhou, sem, no entanto, acertar o saldos de gol de cada time.
          </Text>
          <WrapperExample>
            <Text>
              <b>Exemplo:</b> Jogo 5x1. Palpite: 1x0
            </Text>
          </WrapperExample>
          <WrapperTextScore>
            <TextScore>5 pontos</TextScore>
          </WrapperTextScore>
        </WrapperRule>
        <WrapperRule>
          <Subtitle>Acerto Inverso 🤬</Subtitle>
          <Text>
            Palpite no qual o placar apostado é invertido ao ocorrido, neste
            caso o jogador receberá a de pontuação -2 pontos no ranking.
          </Text>
          <WrapperExample>
            <Text>
              <b>Exemplo:</b> Casados 1x0 Solteiros e o placar final for Casados
              0x1 Solteiros.
            </Text>
          </WrapperExample>
          <WrapperTextScore>
            <TextScore negative={true}> - 2 pontos</TextScore>
          </WrapperTextScore>
        </WrapperRule>
      </Wrapper>
    </Container>
  );
}

export default GameRules;
