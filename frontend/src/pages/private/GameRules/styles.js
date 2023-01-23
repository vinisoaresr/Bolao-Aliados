import styled from "styled-components";

export const Container = styled.section`
  background-color: ${(props) => props.theme.colors.background_2};
  height: 100%;
  width: 80vw;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 5vh;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: start;
  justify-content: center;

  gap: 20px;
  padding: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const WrapperRule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 20px;

  border-radius: 15px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const WrapperExample = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: 100%;

  padding: 10px;
  border-radius: 15px;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.title};
  padding: 10px;
  font-size: 22px;
  text-align: center;
`;

export const Subtitle = styled.h2`
  color: ${(props) => props.theme.colors.subtitle};
  padding: 10px;
  font-size: 16px;
  text-align: center;
`;

export const Text = styled.p`
  color: ${(props) => props.theme.colors.subtitle};
  padding: 5px;
  font-size: 14px;
  font-weight: 300;
  text-align: justify;
`;

export const WrapperTextScore = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
`;

export const TextScore = styled.p`
  color: ${(props) => props.theme.colors.text};

  font-size: 14px;
  font-weight: 400;
  text-align: center;
  line-height: 30px;

  width: 100%;

  background-color: ${(props) =>
    props.negative ? props.theme.colors.red_1 : props.theme.colors.primary};
  border-radius: 15px;
`;
