import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./dashboard.css";
import Header from "../../components/Header";
import Title from "../../components/Title";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>
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
              <tr key="lista1">
                <td data-label="Cliente">Mercado </td>
                <td data-label="Assunto">Suporte </td>
                <td data-label="Status">
                  <span className="badge" style={{ backgroundColor: "#999" }}>
                    Em aberto
                  </span>{" "}
                </td>
                <td data-label="Cadastrado">12/05/2025 </td>
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

              <tr key="lista2">
                <td data-label="Cliente">Mercado </td>
                <td data-label="Assunto">Suporte </td>
                <td data-label="Status">
                  <span className="badge" style={{ backgroundColor: "#999" }}>
                    Em aberto
                  </span>{" "}
                </td>
                <td data-label="Cadastrado">12/05/2025 </td>
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
            </tbody>
          </table>
        </>
      </div>
    </>
  );
}
