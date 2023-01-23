import styled from "styled-components";

export const Container = styled.div``;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin: auto;
  padding-left: 10%;
  padding-right: 10%;
`;

export const FlagIcon = styled.img`
  border-radius: 50%;
  height: 24px;
  width: 24px;
`;

export const TextRowTable = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
`;

export const Text = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  padding-top: 5px;
  padding-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  min-width: 1px;
`;
