import styled from "styled-components";

export const CustomButton = styled.button`
  padding: 16px 20px;
  margin: 10px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  max-width: ${(props) => props.width};
  cursor: pointer;

  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};

  font-weight: 600;
  font-size: 16px;
`;
