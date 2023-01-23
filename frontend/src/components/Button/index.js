import React from "react";
import { CustomButton } from "./styles";

const Button = ({ Text, onClick, Type = "button", width = "350px" }) => {
  return (
    <CustomButton type={Type} onClick={onClick} width={width}>
      {Text}
    </CustomButton>
  );
};

export default Button;
