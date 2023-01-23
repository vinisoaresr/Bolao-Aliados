import styled from "styled-components";

export const InputField = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;

  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border: none;
`;
