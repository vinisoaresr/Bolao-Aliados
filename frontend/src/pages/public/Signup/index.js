import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import {
  Container,
  Content,
  Label,
  LabelSignin,
  Strong,
  LabelError,
} from "./styles";
import useToast from "../../../hooks/useToast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { notifyUser } = useToast();
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!email | !emailConf | !senha) {
      setError("Preencha todos os campos!");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais!");
      return;
    } else if (!isValidEmail(email)) {
      setError("Digite um e-mail válido!");
      return;
    }

    const response = await signUp(email, senha, name);
    if (response === "successful") {
      notifyUser("success", "Usuário cadastrado 😉", "");
      navigate("/");
      return;
    }
    setError(response);
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
        <Label>Crie sua conta 🤑</Label>
        <Input
          type="name"
          placeholder="Digite um nome de exibição 🙋‍♂️"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu e-mail 📧"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu e-mail 🫡"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua senha 🤫"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <LabelError>{error}</LabelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <LabelSignin>
          Já tem uma conta?
          <Strong>
            <Link to="/">&nbsp;Entre</Link>
          </Strong>
        </LabelSignin>
      </Content>
    </Container>
  );
};

export default Signup;
