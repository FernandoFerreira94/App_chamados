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
          <h2>Detalhes do chamados</h2>
          <div className="row">
            <span>
              Cliente: <i> {conteudo.cliente} </i>
            </span>
          </div>
          <div className="row">
            <span>
              Assunto: <i> {conteudo.assunto}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.createdFormat}</i>
            </span>
          </div>
          <div className="row">
            <span>
              Status:{" "}
              <i
                className="badge"
                style={{
                  background: conteudo.status === "Aberto" ? "#5CB85C" : "#999",
                }}
              >
                {conteudo.status}
              </i>
            </span>
          </div>

          <div className="row">
            <span>Complemento:</span>
            <p>{conteudo.complemento ? conteudo.complemento : "..."}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
