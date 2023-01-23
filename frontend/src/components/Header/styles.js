import styled from "styled-components";

export const Container = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid gray;

  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.text};

  > svg {
    position: fixed;
    top: 0;
    left: 0;
    color: ${(props) => props.theme.colors.icon};
    width: 30px;
    height: 30px;
    margin: 20px;
    z-index: 10;
    cursor: pointer;
  }

  > a {
    text-decoration: none;
    color: white;
    font-size: 16px;
    display: inline-block;
    display: flex;
    align-items: center;

    :hover {
      color: ${(props) => props.theme.colors.subtitle};
    }
  }
`;
