import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  

  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background_2};

  height: calc(90vh - 70px);
  width: 80%;
  padding: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.title};
  padding: 10px;
`;

export const DateText = styled.p`
  color: ${(props) => props.theme.colors.subtitle};
  padding: 1px;
  font-size: 16px;
`;

export const TextField = styled.input`
  outline: none;
  padding: 20px 20px;
  width: 60px;
  height: 60px;
  border-radius: 5px;
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.background};
  border: none;
`;

export const Button = styled.button`
  text-decoration: none;
  border: none;
  background-color: ${(props) => props.theme.colors.secundary};
  border-radius: 5px;
  width: 150px;
  height: 40px;
  margin: 0px 0px 20px 0px;

  :hover {
    opacity: 0.6;
  }
`;
