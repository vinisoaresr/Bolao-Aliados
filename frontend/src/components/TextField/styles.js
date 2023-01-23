import styled from "styled-components";

export const Wrapper = styled.div`
  width: 150px;
  display: flex;
  position: relative;
  flex-flow: column nowrap;
`;

export const Input = styled.input`
  height: 42px;
  background-color: black;

  outline: none;
  resize: none;
  box-sizing: border-box;

  background-color: white;
  border: 2px solid gray;
  padding: 8px 8px 8px 16px;

  :focus,
  :hover {
    color: blue;
    border-color: black;
  }
`;
