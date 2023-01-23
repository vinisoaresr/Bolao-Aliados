import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Container, Content, Label, Strong, LabelError, Title } from "./styles";
import useToast from "../../../hooks/useToast";

const RequestAccountRecovery = () => {
  const { notifyUser } = useToast();
  const { RequestAccountRecovery } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAccountRecovery = async () => {
    if (!email | !isValidEmail(email)) {
      setError("Endereço de e-mail inválido");
      return;
    }
    const res = await RequestAccountRecovery(email);
    if (res === true) {
      notifyUser("success", "E-mail enviado", "");
      navigate("/");
      return;
    }
    notifyUser("error", "Ocorreu um erro 😧", `${res.data}`);
    setError(res);
    return;
  };

  const isValidEmail = (email) => {
    let regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Container>
      <Content>
        <Title>Recuperação de Senha</Title>
        <Label id="body">
          Esqueceu a senha da sua conta? Preencha o campo a seguir com o seu
          e-mail para que possamos lhe enviar um link de recuperação.
        </Label>
        <Input
          type="email"
          placeholder="Digite seu E-mail 😬"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <LabelError>{error}</LabelError>
        <Button
          Text="Enviar e-mail de recuperação"
          onClick={handleAccountRecovery}
        />
        <Label>
          Já tem uma conta?
          <Strong>
            <Link to="/"> Entre aqui!</Link>
          </Strong>
        </Label>
      </Content>
    </Container>
  );
};

export default RequestAccountRecovery;
