import React from "react";
import { FiX } from "react-icons/fi";

import "./modal.css";

export default function Modal({ conteudo, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="btn-Close" onClick={close}>
          <FiX size={25} color="#fff" />
        </button>

        <main>
          <h2>Call details</h2>
          <div className="row">
            <span>
              Customers: <i> {conteudo.cliente} </i>
            </span>
          </div>
          <div className="row">
            <span>
              Subject: <i> {conteudo.assunto}</i>
            </span>
            <span>
              Registered in: <i>{conteudo.createdFormat}</i>
            </span>
          </div>
          <div className="row">
            <span>
              Status:{" "}
              <i
                className="badge"
                style={{
                  background: conteudo.status === "Open" ? "#5CB85C" : "#999",
                }}
              >
                {conteudo.status}
              </i>
            </span>
          </div>

          <div className="row">
            <span>Complement:</span>
            <p>{conteudo.complemento ? conteudo.complemento : "..."}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
