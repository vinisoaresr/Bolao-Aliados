import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 99;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: black;
  opacity: 0.5;

  pointer-events: none;
  user-select: none;

  transition: opacity 300ms;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  text-align: center;
  color: #ffffff;
  transform: translateX(-50%, -50%);
  text-shadow: 0 1px 8px rgba(#000000, 0.6);
  font-size: 24px;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 4px solid #111111;
  border-left-color: #666666;
  animation: ${rotate} 0.8s infinite linear;
  transform: translateX(-50%) translateY(-50%);
`;
