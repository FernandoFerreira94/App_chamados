import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

import { AuthContext } from "../../contexts/auth";

import "./header.css";
import avatarImg from "../../assets/avatar.png";
import photoPerfil from "../../assets/photoPerfil2.jpg";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="foto do usuario"
        />
      </div>
      <Link to="/dashboard">
        <FiHome color="#fff" size={24} /> Chamados
      </Link>

      <Link to="/customrs">
        <FiUser color="#fff" size={24} /> Clientes
      </Link>

      <Link to="/profile">
        <FiSettings color="#fff" size={24} /> Perfil
      </Link>
    </div>
  );
}
