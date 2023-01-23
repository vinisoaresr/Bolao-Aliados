import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background_2};
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 20px;

  a {
    padding: 5px;
    display: block;
    text-align: start;

    text-decoration: none;
    color: ${(props) => props.theme.colors.title};
    font-size: 16px;
  }

  svg {
    width: 22px;
    height: 22px;
    margin-left: 20px;
    margin-right: 20px;

    text-decoration: none;
    color: ${(props) => props.theme.colors.title};
    font-size: 16px;
    display: inline-block;
  }

  &:hover {
    background-color: ${(props) =>
      props.isActive
        ? props.theme.colors.blue_2
        : props.theme.colors.bg_color[40]};

    a,
    svg {
      color: ${(props) =>
        props.isActive
          ? props.theme.colors.title
          : props.theme.colors.bg_color[50]};
      cursor: ${(props) => (props.isActive ? "pointer" : "not-allowed")};
    }
  }
`;
