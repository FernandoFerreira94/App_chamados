import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../SignIn/signin.css";

import logo from "../../assets/logo.png";

import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadinAuth } = useContext(AuthContext);

  function clearCamp() {
    setName("");
    setEmail("");
    setPassword("");
  }

  async function handleSubmit(event) {
    event.preventDefault(); // Prevenir o comportamento padrão de submissão do formulário

    if (name !== "" && email !== "" && password !== "") {
      await signUp(name, email, password);

      clearCamp();
    } else {
      toast.warning("Fill in all fields");
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="logo do sistema de chamados" />
        </div>
        <form onSubmit={handleSubmit} className="form-signIn">
          <h1>New account</h1>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

          <input
            type="submit"
            value={loadinAuth ? "Registering..." : "Register"}
          />
        </form>

        <Link to={"/"}>Already have an account? Log in.</Link>
      </div>
    </div>
  );
}
