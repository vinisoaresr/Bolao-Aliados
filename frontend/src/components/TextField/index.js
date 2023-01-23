import React from "react";
import { Input, Wrapper } from "./styles";

const TextField = ({ label, placeholder, locked = false }) => {
  return (
    <Wrapper>
      <p>teste</p>
      <Input placeholder={placeholder}></Input>
    </Wrapper>
  );
};

export default TextField;
