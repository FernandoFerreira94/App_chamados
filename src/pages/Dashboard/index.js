import React, { useEffect, useState } from "react";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
} from "firebase/firestore";

import "./dashboard.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import { db } from "../../services/firebaseConection.js";

export default function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState({});

  const docRef = collection(db, "chamdos");

  useEffect(() => {
    async function loadChamados() {
      const q = query(docRef, orderBy("created", "desc"), limit(10));

      const querySnapshot = await getDocs(q);

      await updateState(querySnapshot);

      setLoading(false);
    }
    loadChamados();

    return () => {};
  }, [docRef]);

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
          created: doc.data().created,
          createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy"),
          complemento: doc.data().complemento,
        });

        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        setChamados(lista);
        setLastDocs(lastDoc);
      });
    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);
  }

  async function handleMore() {
    setLoadingMore(true);
    const q = query(
      docRef,
      orderBy("created", "desc"),
      startAfter(lastDocs),
      limit(10)
    );

    const querySnapshot = await getDocs(q);

    await updateState(querySnapshot);
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Tickets">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>Looking for calls...</span>
          </div>
        </div>
      </div>
    );
  }

  async function handleShowPostModal(iten) {
    setShowPostModal(!showPostModal);
    setDetail(iten);
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
              <span>No call found...</span>
              <br />
              <Link to="/new" className="link-new">
                {" "}
                <FiPlus size={25} color="#fff" />
                New call
              </Link>
            </div>
          ) : (
            <>
              <Link to="/new" className="link-new">
                {" "}
                <FiPlus size={25} color="#fff" />
                New call
              </Link>

              <table>
                <thead>
                  <tr key="">
                    <th scope="col">Customers</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Status</th>
                    <th scope="col">Registered in</th>
                    <th scope="col">#</th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((iten, index) => (
                    <tr key={index}>
                      <td data-label="Cliente">{iten.cliente} </td>
                      <td data-label="Assunto">{iten.assunto} </td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            background:
                              iten.status === "Open" ? "#5CB85C" : "#999",
                          }}
                        >
                          {" "}
                          {iten.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado"> {iten.createdFormat} </td>
                      <td data-label="#">
                        <button onClick={() => handleShowPostModal(iten)}>
                          <FiSearch
                            className="action"
                            size={17}
                            color="#fff"
                            style={{ backgroundColor: "#3583f6" }}
                          />
                        </button>{" "}
                        <Link to={`/new/${iten.id}`}>
                          <FiEdit2
                            className="action"
                            size={17}
                            color="#fff"
                            style={{ backgroundColor: "f6a935" }}
                          />
                        </Link>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loadingMore && (
                <div className="container">
                  <h3>Looking for more calls...</h3>
                </div>
              )}
              {!loadingMore && !isEmpty && (
                <button onClick={handleMore} className="btnMore">
                  Search more
                </button>
              )}
            </>
          )}
        </>
      </div>

      {showPostModal && (
        <Modal
          conteudo={detail}
          close={() => setShowPostModal(!showPostModal)}
        />
      )}
    </>
  );
}
