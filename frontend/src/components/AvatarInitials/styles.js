import styled from "styled-components";

export const Initials = styled.h2`
  width: 32px;
  height: 32px;
  font-size: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bg};
  color: #ffffff;
  opacity: 0.9;
`;
