import React from "react";
import { InputField } from "./styles";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <InputField
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
