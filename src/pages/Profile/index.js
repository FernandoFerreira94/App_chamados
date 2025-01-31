import React, { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";

import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import avatarImg from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  return (
    <>
      <Header />
      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>
        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" />
              <br />
              {avatarUrl === null ? (
                <img
                  src={avatarImg}
                  alt="Foto do perfil"
                  width={220}
                  height={220}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto do perfil"
                  width={220}
                  height={220}
                />
              )}
            </label>

            <label>Nome</label>
            <input type="text" placeholder={user.nome} />

            <label>Email</label>
            <input type="text" placeholder={user.email} disabled={true} />

            <input type="submit" value="Salvar" />
          </form>
        </div>

        <div className="container">
          <button className="btn-logout">Sair</button>
        </div>
      </div>
    </>
  );
}
