import React from "react";
import { Container, Spinner, Label } from "./styles";

export function SpinnerLoading({ label = "Carregando..." }) {
  return (
    <Container>
      <Label>
        <Spinner />
        {label}
      </Label>
    </Container>
  );
}

export default SpinnerLoading;
