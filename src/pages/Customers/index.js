import React, { useState, useContext } from "react";

import "./customers.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";

import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConection.js";

export default function Customers() {
  const { loadingAuth, setLoadingAuth } = useContext(AuthContext);

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
          toast.success("Data Saved");
          setLoadingAuth(false);
        })
        .catch((e) => {
          console.log(e);
          toast.error("Failed to save client");
        });
    } else {
      toast.warning("Fill in all fields!");
      setLoadingAuth(false);
    }
  }
  return (
    <>
      <Header />
      <div className="content">
        <Title name="Customers">
          <FiUser size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Customers name</label>
            <input
              type="text"
              placeholder="Company name"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
            />
            <label>CNPJ</label>
            <input
              type="text"
              placeholder="Enter CNPJ"
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
              }}
            />
            <label>Address</label>
            <input
              type="text"
              placeholder="Company address"
              value={endereco}
              onChange={(e) => {
                setEndereco(e.target.value);
              }}
            />
            <input
              type="submit"
              value={loadingAuth ? "Registering..." : "Register"}
            />
          </form>
        </div>
      </div>
    </>
  );
}
