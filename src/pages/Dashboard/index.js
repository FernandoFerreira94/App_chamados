import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./dashboard.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { db } from "../../services/firebaseConection.js";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
} from "firebase/firestore";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const docRef = collection(db, "chamdos");
  useEffect(() => {
    async function loadChamados() {
      const q = query(docRef, orderBy("created", "desc"), limit(5));

      const querySnapsot = await getDocs(q);

      await updateState(querySnapsot);

      setLoading(false);
    }
    loadChamados();

    return () => {};
  }, []);

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          status: doc.data().status,
          created: doc.data().created.toDate().toLocaleDateString(),
          complemento: doc.data().complemento,
        });

        setChamados((chamados) => [...chamados, ...lista]);
      });
    } else {
      setIsEmpty(true);
    }
  }

  return (
    <>
      <Header />
      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>
        <>
          {chamados.length === 0 ? (
            <div className="content dashboard">
              <span>Nenhum chamados encontrado ...</span>
              <br />
              <Link to="/new" className="link-new">
                {" "}
                <FiPlus size={25} color="#fff" />
                Novo chamado
              </Link>
            </div>
          ) : (
            <>
              <Link to="/new" className="link-new">
                {" "}
                <FiPlus size={25} color="#fff" />
                Novo chamado
              </Link>

              <table>
                <thead>
                  <tr key="">
                    <th scope="col">Cliente</th>
                    <th scope="col">Assunto</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrando em</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((chamado, index) => (
                    <tr key={index}>
                      <td data-label="Cliente">{chamado.cliente} </td>
                      <td data-label="Assunto">{chamado.assunto} </td>
                      <td data-label="Status">
                        {chamado.status === "Aberto" ? (
                          <span
                            style={{
                              backgroundColor: "#999",
                              padding: "3px 4px",
                              borderRadius: "5px",
                            }}
                          >
                            {chamado.status}
                          </span>
                        ) : (
                          <span
                            style={{
                              backgroundColor: "#83bf02",
                              padding: "3px 4px",
                              borderRadius: "5px",
                            }}
                          >
                            {chamado.status}
                          </span>
                        )}
                      </td>
                      <td data-label="Cadastrado"> {chamado.created} </td>
                      <td data-label="#">
                        <button>
                          <FiSearch
                            className="action"
                            size={17}
                            color="#fff"
                            style={{ backgroundColor: "#3583f6" }}
                          />
                        </button>{" "}
                        <button>
                          <FiEdit2
                            className="action"
                            size={17}
                            color="#fff"
                            style={{ backgroundColor: "f6a935" }}
                          />
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      </div>
    </>
  );
}
