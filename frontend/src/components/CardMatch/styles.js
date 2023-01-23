import styled from "styled-components";

export const Card = styled.div`
  background-color: ${(props) =>
    props.hasTransaction
      ? props.theme.colors.bg_color[30]
      : props.theme.colors.bg_color[20]};

  border-radius: 8px;
  box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);

  margin: 20px 10px 20px 10px;

  height: 100%;
  width: 200px;

  transition: all 0.2s linear;
  :hover {
    transform: translateY(-2px);
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const Button = styled.button`
  // if hasTransaction is true, set color red, if hasTransaction is false, set color green

  background-color: ${(props) =>
    props.hasTransaction
      ? props.theme.colors.bg_color[10]
      : props.theme.colors.red_1};

  color: ${(props) =>
    props.hasTransaction ? props.theme.colors.text : props.theme.colors.text};

  :hover {
    background-color: ${(props) =>
      props.hasTransaction
        ? props.theme.colors.bg_color[20]
        : props.theme.colors.red_2};
    cursor: pointer;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 10px;

  width: 80%;
  height: 12%;
  min-height: 15px;
  max-height: 25px;

  border-radius: 20px;
  border: none;

  font-size: 14px;
  font-weight: 300;
  text-decoration: none;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 80px;
  height: 100%;
`;
export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  align-content: space-around;
  padding: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 16px;
  color: ${(props) => props.theme.colors.title};
  padding: 5px;
  text-align: center;

  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
  display: block;
  min-width: 1px;
`;

export const DateText = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.subtitle};
  padding: 5px;
  text-align: center;
`;

export const FlagIcon = styled.img`
  width: 50px;
  height: 50px;
  margin: 8px;
  border-radius: 50%;

  // object-fit: cover;
`;
