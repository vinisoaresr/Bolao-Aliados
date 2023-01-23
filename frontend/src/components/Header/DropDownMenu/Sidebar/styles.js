import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  width: 250px;
  left: ${(props) => (props.sidebar ? "0" : "-100%")};
  animation: showSidebar 0.3s;

  z-index: 100;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    color: ${(props) => props.theme.colors.title};
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 250px;
    }
  }
`;

export const Content = styled.div`
  margin-top: 70px;
`;

export const Toggle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px;
  text-align: center;
  font-size: 12px;
  font-weight: 300;
`;

export const Text = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 10px;
`;
