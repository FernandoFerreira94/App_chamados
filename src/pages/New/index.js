import React, { useContext, useState, useEffect } from "react";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { db } from "../../services/firebaseConection.js";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { AuthContext } from "../../contexts/auth";
import { FiPlusCircle } from "react-icons/fi";

import "./new.css";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const listRef = collection(db, "customers");
export default function New() {
  const { loadingAuth, setLoadingAuth, user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [loadCustomer, setLoadCustomer] = useState(true);

  const [customersSelected, setCustomersSelected] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("suporte");
  const [status, setStatus] = useState("Aberto");
  const [idCustomer, setIdCustomer] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      const queryCustomres = await getDocs(listRef)
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (snapshot.docs.length === 0) {
            console.log("NENHUMA EMPRESA CADASTRADA");
            setCustomers([
              {
                id: "1",
                nomeFantasia: "FREELA",
              },
            ]);
            setLoadCustomer(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomer(false);

          if (id) {
            loadId(lista);
          }
        })
        .catch((e) => {
          console.log("ERRO AO BUSCAR CLIENTES", e);
          setLoadCustomer(false);
          setCustomers([
            {
              id: "1",
              nomeFantas: "FREELA",
            },
          ]);
        });
    }
    loadCustomers();
  }, [id]);

  async function loadId(lista) {
    const docRef = doc(db, "chamdos", id);

    await getDoc(docRef)
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setComplemento(snapshot.data().complemento);

        let index = lista.findIndex(
          (item) => item.id === snapshot.data().clienteId
        );

        setCustomersSelected(index);
        setIdCustomer(true);
      })
      .catch((e) => {
        console.log(e);
        setIdCustomer(false);
      });
  }

  async function handleRegistrar(e) {
    e.preventDefault();

    if (idCustomer) {
      const dorRef = doc(db, "chamdos", id);
      await updateDoc(dorRef, {
        assunto: assunto,
        status: status,
        complemento: complemento,
      })
        .then(() => {
          toast.success("Salvo!");
          navigate("/dashboard");
        })
        .catch((e) => {
          console.log(e);
        });
      return;
    }
    setLoadingAuth(true);

    await addDoc(collection(db, "chamdos"), {
      created: new Date(),
      cliente: customers[customersSelected].nomeFantasia,
      clienteId: customers[customersSelected].id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado registrado com sucesso");
        setComplemento("");
        setCustomersSelected(0);
        setLoadingAuth(false);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Ops erro ao Registrar");
        setLoadingAuth(false);
      });
  }

  async function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleSelectChange(e) {
    setAssunto(e.target.value);
    console.log(e.target.value);
  }

  function handleCustomersChange(e) {
    setCustomersSelected(e.target.value);
  }

  async function handleExcluir() {
    const docRef = doc(db, "chamdos", id);

    await deleteDoc(docRef)
      .then(() => {
        toast.error("Chamado excluido");
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <Header />
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegistrar}>
            <label>Clientes</label>
            {loadCustomer ? (
              <input type="text" disabled={true} value="Carregando... " />
            ) : (
              <select
                disabled={idCustomer ? true : false}
                value={customersSelected}
                onChange={handleCustomersChange}
                style={{ cursor: idCustomer ? "not-allowed" : "pointer" }}
              >
                {customers.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assuntos</label>
            <select value={assunto} onChange={handleSelectChange}>
              <option value="Suporte" key="">
                Suporte
              </option>
              <option value="Visita Tecnica" key="1">
                Visita Tecnica
              </option>
              <option value="Financeiro" key="2">
                Financeiro
              </option>
            </select>
            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />

              <span>Em aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>

            <textarea
              typeof="text"
              placeholder="Descreva seu problema (opcinal)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <input
              type="submit"
              value={
                idCustomer
                  ? "Editar"
                  : loadingAuth
                    ? "Registrando"
                    : "Registrar"
              }
            />
            {idCustomer && (
              <input type="submit" value="Excluir" onClick={handleExcluir} />
            )}
          </form>
        </div>
      </div>
    </>
  );
}
