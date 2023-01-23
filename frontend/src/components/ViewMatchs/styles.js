import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  overflow-y: scroll;
`;

export const Row = styled.div`
  display: flex;
  align-items: space-around;
  flex-direction: row;
  font-size: 10px;
`;

export const Column = styled.div`
  display: flex;
  align-items: space-around;
  flex-direction: column;
`;

export const Button = styled.button`
  margin: 5px;
  padding: 15px 20px;
  outline: none;
  border: none;
  border-radius: 5px;

  height: 50px;

  cursor: pointer;

  background-color: ${(props) => props.theme.colors.blue_2};

  color: ${(props) => props.theme.colors.text};
  font-size: 12px;
  font-weight: 400;

  &:hover {
    background-color: ${(props) => props.theme.colors.blue_3};
  }
`;
