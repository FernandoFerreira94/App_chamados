import React from "react";
import "./signup.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Db } from "../../db";
import { auth } from "../../db";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import logo from "../../assets/logo.png";
import { toast } from "react-toastify";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");

  async function handleRegister(event) {
    event.preventDefault(); // Prevenir o comportamento padrão de submissão do formulário
    try {
      // Criar usuário com email e senha
      await createUserWithEmailAndPassword(auth, email, password);

      // Salvar informações do usuário no Firestore
      await setDoc(doc(Db, "registerInfo", email), {
        id: email,
        firstName: firstName,
        surName: surName,
      });

      toast.success("Usuário registrado com sucesso!");
    } catch (e) {
      toast.error("Erro ao registrar usuário: " + e.message);
    }
  }
  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema de chamados" />
        </div>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <input
            type="text"
            placeholder="Digite seu Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Digite seu apelido"
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
          />

          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" value="Register" />
        </form>

        <Link to={"/"}>Já possue uma conta?</Link>
      </div>
    </div>
  );
}
