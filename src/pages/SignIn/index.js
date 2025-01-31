import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./signin.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadinAuth } = useContext(AuthContext);

  function clearCamp() {
    setEmail("");
    setPassword("");
  }

  function handleSingIn(event) {
    event.preventDefault();
    if (email !== "" && password !== "") {
      signIn(email, password);
      clearCamp();
    } else {
      toast.warning("Preenche os campos");
    }
  }
  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema de chamados" />
        </div>
        <form onSubmit={handleSingIn} className="form-signIn">
          <h1>Entrar</h1>
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

          <input type="submit" value={loadinAuth ? "Logando..." : "Acessar"} />
        </form>

        <Link to={"/register"}>Criar uma conta.</Link>
      </div>
    </div>
  );
}
