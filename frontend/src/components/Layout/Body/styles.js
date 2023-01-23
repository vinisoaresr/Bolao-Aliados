import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(100vh - 70px);
  width: 100%;
  background-color: ${(props) => props.theme.colors.bg_color[30]};

  ${(props) => (props.sidebar ? `padding-left: 200px;` : `padding-left: 20px;`)}
  padding: 20px;

  transition: padding-left 0.3s linear;
`;
