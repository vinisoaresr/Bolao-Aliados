import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Container, Content, Label, Strong, LabelError, Title } from "./styles";
import useToast from "../../../hooks/useToast";

const AccountRecovery = () => {
  const { notifyUser } = useToast();
  const { accountRecovery } = useAuth();

  const navigate = useNavigate();
  const { uuid } = useParams();

  const [error, setError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");

  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorCheckNewPassword, setErrorCheckNewPassword] = useState("");

  if (!uuid) {
    navigate("/login");
  }
  const handleAccountRecovery = async () => {
    if (!newPassword || !checkNewPassword) {
      if (!newPassword) {
        setErrorNewPassword("Campo obrigatório!");
      }
      if (!checkNewPassword) {
        setErrorCheckNewPassword("Campo obrigatório!");
      }
      return;
    }
    if (newPassword != checkNewPassword) {
      setNewPassword("");
      setCheckNewPassword("");
      setError("As senhas são diferentes.");
    }

    const res = await accountRecovery(uuid, newPassword);
    if (res === true) {
      notifyUser("success", "E-mail enviado", "");
      navigate("/");
      return;
    }
    notifyUser("error", "Ocorreu um erro 😧", `${res.data}`);

    return;
  };

  return (
    <Container>
      <Content>
        <Title>Recuperação de Senha</Title>
        <Label id="body">
          Para trocar sua senha antiga preencha os campos abaixo e confirme.
        </Label>
        <Input
          type="password"
          placeholder="Digite uma senha nova"
          value={newPassword}
          onChange={(e) => [
            setNewPassword(e.target.value),
            setErrorNewPassword(""),
            setError(""),
          ]}
        />
        <LabelError>{errorNewPassword}</LabelError>
        <Input
          type="password"
          placeholder="Confirme sua senha nova"
          value={checkNewPassword}
          onChange={(e) => [
            setCheckNewPassword(e.target.value),
            setErrorCheckNewPassword(""),
            setError(""),
          ]}
        />
        <LabelError>{errorCheckNewPassword}</LabelError>
        <Button
          Text="Enviar e-mail de recuperação"
          onClick={handleAccountRecovery}
        />
        <LabelError>{error}</LabelError>
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

export default AccountRecovery;
