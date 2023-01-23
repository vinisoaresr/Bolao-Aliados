import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  Container,
  Label,
  Content,
  LabelSignup,
  Strong,
  LabelError,
} from "./styles";
import useToast from "../../../hooks/useToast";

const SignIn = () => {
  const { notifyUser } = useToast();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }
    let response = await signIn(email, senha);

    if (response === "successful") {
      navigate("/home");
      notifyUser("success", "Sucesso", "Sessão iniciada!");
      return;
    }
    setError(response.toString());
    return;
  };

  return (
    <Container>
      <Content>
        <Label>Acesse sua Conta 😜</Label>
        <Input
          type="email"
          placeholder="Digite seu E-mail 🫵"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha 🤫"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <Link to={"/account-recovery"}>Esqueceu a senha?</Link>
        <LabelError>{error}</LabelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <LabelSignup>
          Não tem uma conta?
          <Strong>
            <Link to="/register">&nbsp;Registre-se</Link>
          </Strong>
        </LabelSignup>
      </Content>
    </Container>
  );
};

export default SignIn;
