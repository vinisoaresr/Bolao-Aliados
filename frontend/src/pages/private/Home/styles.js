import styled from "styled-components";

export const Body = styled.div`
  background-color: ${(props) => props.theme.colors.bg_color[30]};
  height: 100%;
  width: 80%;

  display: grid;
  grid-template-rows: 1fr 2fr;
  align-items: center;
  gap: 20px;
`;

export const WrapperCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.bg_color[10]};
  border-radius: 8px;
  padding: 15px;

  width: 100%;
  height: 100%;
  min-height: 220px;
  overflow-x: scroll;
  overflow-y: hidden;

  scroll-behavior: smooth;
`;

export const CarouselButton = styled.button`
  position: absolute;
  margin: -40px;
  width: 40px;
  height: 25vh;
  opacity: 1;

  background-color: transparent;
  border: none;

  /* display: flex; */
  justify-content: center;
  align-items: center;

  &.carousel--left {
    left: 10vw;
    /* background-image: -webkit-linear-gradient(left, #fafafa, transparent); */
  }

  &.carousel--right {
    right: 10vw;
    /* background-image: -webkit-linear-gradient(left, transparent, #fafafa); */
  }

  :hover {
    cursor: pointer;
  }

  svg {
    height: 32px;
    width: 32px;
  }
`;

export const Wrapper = styled.data`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: start;
  gap: 20px;

  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

export const WrapperTransactions = styled.div`
  height: 100%;
  overflow: scroll;
  border-radius: 8px;
  @media (max-width: 780px) {
    display: none;
  }
`;

export const WrapperRanking = styled.div`
  background-color: ${(props) => props.theme.colors.bg_color[10]};
  border-radius: 8px;
  height: 100%;
  overflow: hidden;
`;

//-----//

export const Container = styled.section`
  padding-top: 20px;
  height: 100%;
  width: 100%;

  padding: 10px;

  a {
    text-align: left;
    font-size: 14px;
    color: ${(props) => props.theme.colors.subtitle};
    text-decoration: none;

    :hover {
      color: black;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const WrapperName = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%;
  padding: 5px;
`;
