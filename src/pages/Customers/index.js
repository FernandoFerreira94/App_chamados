import React, { useState, useEffect, useContext } from "react";

import "./customers.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";

import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConection.js";

export default function Customers() {
  const { loadingAuth, setLoadingAuth, user } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  function campoLimpo() {
    setNome("");
    setCnpj("");
    setEndereco("");
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoadingAuth(true);
    if (nome !== "" && cnpj !== "" && endereco !== "") {
      await addDoc(collection(db, "customers"), {
        nomeFantasia: nome,
        cnpj: cnpj,
        endereco: endereco,
      })
        .then(() => {
          campoLimpo();
          toast.success("Dados Salvo");
          setLoadingAuth(false);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Ops falha ao salvar cliente");
        });
    } else {
      toast.warning("Preencha todos os campos!");
      setLoadingAuth(false);
    }
  }
  return (
    <>
      <Header />
      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Nome do cliente</label>
            <input
              type="text"
              placeholder="Nome da empresa"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
            <label>CNPJ</label>
            <input
              type="text"
              placeholder="Digite CNPJ"
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
              }}
            />
            <label>Endereço</label>
            <input
              type="text"
              placeholder="Endereço da empresa"
              value={endereco}
              onChange={(e) => {
                setEndereco(e.target.value);
              }}
            />
            <input
              type="submit"
              value={loadingAuth ? "Salvando..." : "Salvar"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
