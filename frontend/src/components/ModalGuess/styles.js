import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);

  height: 100%;
  width: 100%;
  padding: 20px;

  background-color: ${(props) => props.theme.colors.bg_color[10]};

  transition: all 0.2s linear;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 50%;
`;

export const Column = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &.title {
    flex: 1;
    justify-content: center;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  margin: 10px;
  width: 100%;
  min-width: 1px;

  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.title};
  text-align: center;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusMatch = styled.h1`
  height: 15%;
  min-height: 40px;

  width: 40%;
  min-width: 130px;
  max-width: 300px;

  padding: 20px;

  font-size: 16px;
  font-weight: 300;
  color: white;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 20px;
  text-align: center;
  margin: auto;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.p`
  display: flex;
  flex-direction: row;

  font-size: 16px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.text};
  display: inline-block;
`;

export const FlagIcon = styled.img`
  width: 12vh;
  height: 12vh;
  margin: 10px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.hasTransaction
      ? props.theme.colors.bg_color[10]
      : props.theme.colors.red_1};

  color: ${(props) =>
    props.hasTransaction ? props.theme.colors.title : props.theme.colors.tile};

  :hover {
    background-color: ${(props) =>
      props.hasTransaction
        ? props.theme.colors.bg_color[20]
        : props.theme.colors.red_2};
  }
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 400;
  text-decoration: none;

  padding: 0;
  border: none;
  background: none;

  color: ${(props) => props.theme.colors.title};
  background-color: ${(props) => props.theme.colors.red_2};

  margin: 5px;
  height: 10%;

  width: 40%;
  min-width: 250px;
  max-width: 400px;
  border-radius: 20px;

  :hover {
    color: ${(props) => props.theme.colors.title};
    cursor: pointer;
  }
`;

export const TextField = styled.input`
  text-align: center;
  text-decoration: none;
  margin: 10px;

  width: 30%;
  min-width: 40px;
  max-width: 80px;

  height: 30%;
  min-height: 40px;
  max-height: 80px;

  border-radius: 20px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.bg_color[30]};
  border: none;

  :focus {
    background-color: white;
    color: black;
    outline: solid;
  }
`;
