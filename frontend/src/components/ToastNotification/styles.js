import styled from "styled-components";

export const Container = styled.div`
  z-index: 9999;
  position: fixed;
  top: 100px;
  right: 30px;

  display: flex;
  padding: 5px;
  border-radius: 8px;

  ${(props) =>
    props.type == "info"
      ? `background: ${props.theme.colors.toast.info};`
      : props.type == "success"
      ? `background: ${props.theme.colors.toast.success};`
      : `background: ${props.theme.colors.toast.error};`}

  height: 80px;
  min-height: 10vh;
  max-height: 35vh;

  width: 350px;
  min-width: 20vw;
  max-width: 60vw;

  animation: showToast 0.9s;
  @keyframes showToast {
    from {
      position: fixed;
      top: 100px;
      right: 0px;
      opacity: 0.3;
    }
    to {
      position: fixed;
      top: 100px;
      right: 30px;
      opacity: 1;
    }
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(30px, 1fr) minmax(60px, 10fr) minmax(30px, 1fr);
  align-items: center;

  width: 100%;
  justify-content: space-between;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 5px 0px 5px;
  height: 60px;
  border-right: solid 1px black;
  svg {
    color: black;
    width: 32px;
    height: 32px;
  }
`;

export const Column = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  padding: 10px 10px 0px 10px;

  width: 100%;
`;

export const Title = styled.h1`
  text-align: left;
  color: black;
  font-size: 18px;
  //color: ${(props) => props.theme.colors.title};
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 1px;
`;

export const Message = styled.p`
  text-align: left;
  color: black;
  font-size: 14px;
  //color: ${(props) => props.theme.colors.title};

  line-height: 1em;
  max-height: 2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const CloseButton = styled.button`
  color: black;
  border-radius: 50%;

  height: 25px;
  width: 25px;

  border: none;
  background-color: transparent;

  border-radius: 50%;
  svg {
    height: 25px;
    width: 25px;
  }
  :hover {
    cursor: pointer;
  }
`;
